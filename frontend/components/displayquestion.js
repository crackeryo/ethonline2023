import styles from './displayquestion.module.css';
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
import Countdown from './countdown';

export default function DisplayQuestion() {

    const [address, setAddress] = useState(null);
    const [isAccountConnected,setIsAccountConnceted]=useState(false);

    const { address: accountAddress , isConnected} = useAccount();
    const [mychain, setmychain] = useState(null);
    const { chain, chains } = useNetwork()
    const [curr_contract,setcurr_contract]=useState(contract_addr)
    const [questionList, setQuestionList]=useState([])
    
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
        functionName: 'listQuestions',
        onSettled(data, error) {
            if(data){
                    console.log(data)
                    setQuestionList(data)
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
        args: [0],
        onSettled(data, error) {
            if(data){
                    console.log(data)
            }
            if(error){
                console.log("failed")
                console.log(error)
            }
  
        },
      })






    const [showExpired, setShowExpired] = useState(true); // State to manage visibility

    const currentDate = Math.floor(new Date().getTime()/1000);
    

return (

      
<div className={styles.container}>

   
    
    {isAccountConnected ? (
        <>



    {/* {mychain && <div>Connected to {mychain.name}</div>}
           */}


    <div className={styles.container}>
    <h1> Question List ({mychain.name})</h1>
    <button  className={showExpired ? styles.showExpired : styles.hideExpired} onClick={() => setShowExpired(!showExpired)}>
        {showExpired ? "Hide Expired Questions" : "Show Expired Questions"}
      </button>
      {questionList.map((data, index) => (

         ((Number(data.deadline)> currentDate || showExpired) &&

        <Link href={`/question?questionid=${index}`} style={{ textDecoration: "none" }}>
          <div key={index} className={styles.questionContainer}>
            <h2  className={styles.question}>{data.content} [{Number(data.qualifiedAnswersCount)}]</h2>
            <div className={styles.choiceContainer}>
              <div className={`${styles.choice} ${styles.bgcolor1} `} > {data.option1}</div>
              <div  className={`${styles.choice} ${styles.bgcolor2} `} > {data.option2}</div>
            </div>

            {/* <p>Creator: {data.creator}</p> */}
            <div  className={styles.choiceContainer}>
              <div  className={styles.numtext}>Bounty: {Number(data.stake)/1000000000000000000} ETH</div>
              <div  className={styles.numtext}>Entry Stake: {Number(data.entryFee)/1000000000000000000} ETH</div>
            </div>
            <p  className={styles.deadline}>Ends: &nbsp;
              <Countdown deadline={Number(data.deadline)}></Countdown></p>
            
           
            {/* <p>Qualified Answers Count: {Number(data.qualifiedAnswersCount)}</p> */}
           
          </div>
        </Link>
         )
      ))}



    </div>
         
        </>
          
      ) : (
        <p className={styles.warning}>Please connect your wallet to view the page</p>
      )}


 

          
        

</div>



    

    
    );
  }
  