// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuestionAndAnswer is Ownable {

    mapping(address => bool) public admins;

    constructor() {
        admins[msg.sender] = true;
    }

    struct Question {
        address creator;
        uint deadline;
        uint stake;
        uint entryFee;
    }

    struct Answer {
        address creator;
        bool isQualified;
    }

    struct UserEarnings {
        uint earnings;
        uint[] questionIds;
    }

    mapping(uint => Question) public questions;
    mapping(uint => Answer) public answers;
    mapping(address => UserEarnings) public userEarnings;

    event QuestionCreated(uint questionId, address creator, uint deadline, uint stake, uint entryFee);
    event AnswerCreated(uint questionId, address creator, bool isQualified);
    event AdminAdded(address newAdmin);
    event AdminRemoved(address removedAdmin);
    event EarningsRedeemed(address user, uint amount);
    event AnswerQualifyingStatusChanged(uint answerId, bool isQualified); // Updated event

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

    function createQuestion(uint _deadline, uint _stake, uint _entryFee) public {
        questions[questionCounter] = Question({
            creator: msg.sender,
            deadline: block.timestamp + _deadline,
            stake: _stake,
            entryFee: _entryFee
        });
        emit QuestionCreated(questionCounter, msg.sender, questions[questionCounter].deadline, _stake, _entryFee);
        questionCounter++;
    }

    function createAnswer(uint questionId) public payable questionNotClosed(questionId) {
        require(msg.value >= questions[questionId].entryFee, "Insufficient entry fee sent with the answer");
        answers[answerCounter] = Answer({
            creator: msg.sender,
            isQualified: false
        });
        emit AnswerCreated(answerCounter, msg.sender, false);
        userEarnings[msg.sender].questionIds.push(questionId);
        answerCounter++;
    }

    function redeemEarnings() public {
        uint totalEarnings = 0;
        uint[] memory questionIds = userEarnings[msg.sender].questionIds;
        
        for (uint i = 0; i < questionIds.length; i++) {
            uint questionId = questionIds[i];
            if (answers[questionId].isQualified) {
                totalEarnings += questions[questionId].stake / userEarnings[msg.sender].questionIds.length;
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
        answers[answerId].isQualified = newStatus;
        emit AnswerQualifyingStatusChanged(answerId, newStatus); // Updated event
    }
}
