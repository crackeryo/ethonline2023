// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
contract DualDialogue  is Ownable{

    mapping(address => bool) public admins;

    constructor() {
        admins[msg.sender] = true;
    }

    struct Question {
        address creator;
        uint deadline;
        uint stake;
        uint entryFee;
        string content;
        string option1;
        string option2;
        uint qualifiedAnswersCount; // Track the number of qualified answers
    }

    struct Answer {
        address creator;
        bool isQualified;
        uint chosenOption;
        string content;
        uint questionId; 
    }

    struct UserEarnings {
        uint earnings;
        uint[] questionIds;
    }

    mapping(uint => Question) public questions;
    mapping(uint => Answer) public answers;
    mapping(address => UserEarnings) public userEarnings;

    event QuestionCreated(uint questionId, address creator, uint deadline, uint stake, uint entryFee, string content, string option1, string option2);
    event AnswerCreated(uint questionId, address creator, bool isQualified);
    event AdminAdded(address newAdmin);
    event AdminRemoved(address removedAdmin);
    event EarningsRedeemed(address user, uint amount);
    event AnswerQualifyingStatusChanged(uint answerId, bool isQualified);

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only an admin can call this function");
        _;
    }

    uint public questionCounter;
    uint public answerCounter;

    function addAdmin(address newAdmin) public onlyOwner {
        admins[newAdmin] = true;
        emit AdminAdded(newAdmin);
    }

    function removeAdmin(address adminToRemove) public onlyOwner {
        admins[adminToRemove] = false;
        emit AdminRemoved(adminToRemove);
    }

    function createQuestion(uint _deadline, uint _stake, uint _entryFee, string memory _content, string memory _option1, string memory _option2) public payable {
        require(bytes(_content).length <= 100, "Content exceeds maximum length");
        require(bytes(_option1).length <= 20, "Option 1 exceeds maximum length");
        require(bytes(_option2).length <= 20, "Option 2 exceeds maximum length");
        require(msg.value == _stake, "Insufficient stake sent with the question");
        
        questions[questionCounter] = Question({
            creator: msg.sender,
            deadline: block.timestamp + _deadline,
            stake: _stake,
            entryFee: _entryFee,
            content: _content,
            option1: _option1,
            option2: _option2,
            qualifiedAnswersCount: 0 // Initialize the count to zero
        });
        emit QuestionCreated(questionCounter, msg.sender, questions[questionCounter].deadline, _stake, _entryFee, _content, _option1, _option2);
        questionCounter++;
    }

    function createAnswer(uint questionId, uint chosenOption, string memory _content) public payable questionNotClosed(questionId) {
        // require(questionId < questionCounter, "Question does not exist");
        require(msg.value >= questions[questionId].entryFee, "Insufficient entry fee sent with the answer");
        require(chosenOption == 0 || chosenOption == 1, "Invalid option chosen");
        require(bytes(_content).length >= 30 && bytes(_content).length <= 200, "Content length must be between 30 and 200 characters");

        answers[answerCounter] = Answer({
            creator: msg.sender,
            isQualified: true, // Set to true by default
            chosenOption: chosenOption,
            content: _content,
            questionId: questionId
        });
        questions[questionId].qualifiedAnswersCount++; // Increment the count for qualified answers

        emit AnswerCreated(answerCounter, msg.sender, true); // Emit the answer as qualified
        userEarnings[msg.sender].questionIds.push(questionId);
        answerCounter++;
    }

    function redeemEarnings() public {
        uint totalEarnings = 0;
        uint[] memory questionIds = userEarnings[msg.sender].questionIds;
        
        for (uint i = 0; i < questionIds.length; i++) {
            uint questionId = questionIds[i];
            if (answers[questionId].isQualified) {
                totalEarnings += (questions[questionId].stake / questions[questionId].qualifiedAnswersCount);
            }
        }
        
        userEarnings[msg.sender].earnings = totalEarnings;
        emit EarningsRedeemed(msg.sender, totalEarnings);
    }

    modifier questionNotClosed(uint questionId) {
        require(block.timestamp < questions[questionId].deadline, "Question deadline reached");
        _;
    }

    function changeAnswerQualifyingStatus(uint answerId, bool newStatus) public onlyAdmin {
        require(answerId < answerCounter, "Answer does not exist");
        uint questionId = userEarnings[msg.sender].questionIds[answerId];
        Question storage question = questions[questionId];
        
        if (answers[answerId].isQualified && !newStatus) {
            question.qualifiedAnswersCount--; // Decrease the count when unqualifying an answer
        } else if (!answers[answerId].isQualified && newStatus) {
            question.qualifiedAnswersCount++; // Increase the count when qualifying an answer
        }
        
        answers[answerId].isQualified = newStatus;
        emit AnswerQualifyingStatusChanged(answerId, newStatus);
    }

    // View function to get the count of votes for chosenOption=0 and chosenOption=1 for a specific question
    function getVoteCount(uint questionId) public view returns (uint countOption0, uint countOption1) {
        require(questionId < questionCounter, "Question does not exist");
        
        for (uint i = 0; i < answerCounter; i++) {
            if (answers[i].chosenOption == 0 && userEarnings[answers[i].creator].questionIds[i] == questionId) {
                countOption0++;
            } else if (answers[i].chosenOption == 1 && userEarnings[answers[i].creator].questionIds[i] == questionId) {
                countOption1++;
            }
        }
        
        return (countOption0, countOption1);
    }

    function listQuestions() public view returns (Question[] memory) {
        Question[] memory allQuestions = new Question[](questionCounter);
        for (uint i = 0; i < questionCounter; i++) {
            allQuestions[i] = questions[i];
        }
        return allQuestions;    
    }

    function listAnswers(uint questionId) public view returns (Answer[] memory) {
        require(questionId < questionCounter, "Question does not exist");

        uint count = 0;
        Answer[] memory questionAnswers = new Answer[](answerCounter);

        for (uint i = 0; i < answerCounter; i++) {
            if (answers[i].questionId == questionId) {
                questionAnswers[count] = answers[i];
                count++;
            }
        }

        // Resize the array to the actual count
        assembly {
            mstore(questionAnswers, count)
        }

        return questionAnswers;
    }


}
