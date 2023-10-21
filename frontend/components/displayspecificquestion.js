import styles from './displayspecificquestion.module.css';
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { usePrepareContractWrite, useContractWrite,useWaitForTransaction} from 'wagmi'
import {
  useAccount,
} from 'wagmi'

import { abi,contract_addr,contract_addr_scroll,contract_addr_mantle } from './nft-abi';
import { ethers } from 'ethers';
import Link from 'next/link';

import { isErrored } from 'stream';
import { useNetwork } from 'wagmi'
import { useRouter } from 'next/router';

export default function DisplaySpecificQuestion() {
    const router = useRouter();
    const { query } = router;
    const { questionid } = query;
    const [address, setAddress] = useState(null);
    const [isAccountConnected,setIsAccountConnceted]=useState(false);

    const { address: accountAddress , isConnected} = useAccount();
    const [mychain, setmychain] = useState(null);
    const { chain, chains } = useNetwork()
    const [curr_contract,setcurr_contract]=useState(contract_addr)
    const [question, setQuestion]=useState(null)
    const [option1, setOption1]=useState(null)
    const [option2, setOption2]=useState(null)
    const [fee, setFee]=useState(0)
    const [voteCount1, setVoteCount1]=useState(0)
    const [voteCount2, setVoteCount2]=useState(0)
    const [answerList, setAnswerList]=useState([])
    const [answer,setAnswer]=useState("")
    const [choice,setChoice]=useState(-1)
    useEffect(() => {
      setIsAccountConnceted(isConnected);
      if (accountAddress) {
        setAddress(accountAddress);
      }
      if(chain){
        setmychain(chain)
        if(chain.name=="scrollSepolia"){
            setcurr_contract(contract_addr_scroll)
        }
        if(chain.name=="Mantle Testnet"){
            setcurr_contract(contract_addr_mantle)
        }
        if(chain.name=="Goerli"){
            setcurr_contract(contract_addr)
        }
      }
      if(!isConnected){
        setAddress(null);
      }
    }, [accountAddress,isConnected,chain]);


 

    
    const {data1} = useContractRead({
        address: curr_contract,
        abi: abi,
        functionName: 'questions',
        args: [questionid],
        onSettled(data, error) {
            if(data){
                setQuestion(data[4])
                setOption1(data[5])
                setOption2(data[6])
                setFee(Number(data[2]))
            }
            if(error){
                console.log("failed")
                console.log(error)
            }
  
        },
      })

      const {data2} = useContractRead({
        address: curr_contract,
        abi: abi,
        functionName: 'listAnswers',
        args: [questionid],
        onSettled(data, error) {
            if(data){
                console.log(data)
                setAnswerList(data)
            }
            if(error){
                console.log("failed")
                console.log(error)
            }
  
        },
      })

      const {data3} = useContractRead({
        address: curr_contract,
        abi: abi,
        functionName: 'getVoteCount',
        args: [questionid],
        onSettled(data, error) {
            if(data){
                setVoteCount1(Number(data[0]))
                setVoteCount2(Number(data[1]))
            }
            if(error){
                console.log("failed")
                console.log(error)
            }
  
        },
      })

      const { config:config_createAnswer ,
        error: prepareError,
        isError: isPrepareError,} = usePrepareContractWrite({
        address: curr_contract,
        abi: abi,
        functionName: 'createAnswer',
        args: [questionid,choice,answer],
        value: fee,
      })

      
      const { data,error, isError,write } = useContractWrite(config_createAnswer)
      const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
      })






      const option0Answers = answerList.filter(data => Number(data.chosenOption) === 0);
      const option1Answers = answerList.filter(data => Number(data.chosenOption) === 1);
    
return (

      
<div className={styles.container}>

    <h1>Display Answers and Vote</h1>
    
    {isAccountConnected ? (
        <>

    {/* {mychain && <div>Connected to {mychain.name}</div>} */}
    <div className={styles.Container}>
            {questionid}
            {question}
            {voteCount1}
            {voteCount2}

        <div className={styles.answerGroups}>
            <div className={styles.answerContainer}>
                <div  className={styles.optionText}>{option1}</div>
            {option0Answers.map((data, index) => (
                <div key={index}>
                    <h2>{data.content}</h2>
                    <p>Creator: {data.creator}</p>
                </div>
            ))}

            </div>
          
            <div className={styles.answerContainer}>
            <div  className={styles.optionText}>{option2}</div>
            {option1Answers.map((data, index) => (

                <div key={index}>
                    <h2>{data.content}</h2>
                    <p>Creator: {data.creator}</p>
                </div>
            ))}

            </div>
        </div>
        <div className={styles.choiceContainer}>
            <div  className={`${styles.choice} ${choice === 0 ? styles.selected : ''}`}
            onClick={() => setChoice(0)}> {option1} </div>
            <div  className={`${styles.choice} ${choice === 1 ? styles.selected : ''}`}
            onClick={() => setChoice(1)}> {option2}</div>
      </div>
        <input    value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
        
        <button className={styles.create_button} disabled={!write} onClick={() => write?.()}>{isLoading ? 'Sending' : 'Answer'}</button>

    </div>
         
        </>
          
      ) : (
        <p>Please connect your wallet to view the page</p>
      )}


 

          
        

</div>



    

    
    );
  }
  