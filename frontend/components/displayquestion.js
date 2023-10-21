import styles from './createquestion.module.css';
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








return (

      
<div className={styles.container}>

    <h1>Display Question</h1>
    
    {isAccountConnected ? (
        <>

    {mychain && <div>Connected to {mychain.name}</div>}
          


    <div className={styles.questionContainer}>

      {questionList.map((data, index) => (
        <Link href={`/question?questionid=${index}`}>
          <div key={index}>
            <h2>{data.content}</h2>
            <p>Creator: {data.creator}</p>
            <p>Ends in: 
              <Countdown deadline={Number(data.deadline)}></Countdown></p>
            <p>Entry Fee: {Number(data.entryFee)/1000000000000000000} ETH</p>
            <p>Option 1: {data.option1}</p>
            <p>Option 2: {data.option2}</p>
            <p>Qualified Answers Count: {Number(data.qualifiedAnswersCount)}</p>
            <p>Stake: {Number(data.stake)/1000000000000000000} ETH</p>
          </div>
        </Link>
      ))}



    </div>
         
        </>
          
      ) : (
        <p>Please connect your wallet to view the page</p>
      )}


 

          
        

</div>



    

    
    );
  }
  