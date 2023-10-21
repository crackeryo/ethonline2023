import styles from './createquestion.module.css';
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { usePrepareContractWrite, useContractWrite,useWaitForTransaction} from 'wagmi'
import {
  useAccount,
} from 'wagmi'

import { abi,contract_addr } from './nft-abi';
import { ethers } from 'ethers';
import Link from 'next/link';

import { isErrored } from 'stream';
import { useNetwork } from 'wagmi'

export default function DisplayQuestion() {

    const [address, setAddress] = useState(null);
    const [isAccountConnected,setIsAccountConnceted]=useState(false);

    const { address: accountAddress , isConnected} = useAccount();
    const [mychain, setmychain] = useState(null);
    const { chain, chains } = useNetwork()
    const [deadline, setDeadline] = useState(1697854852);
    const [stake,setStake]=useState(2000000000000000)
    const [entryFee,setEntryFee]=useState(100000000000000)
    const [content,setContent]=useState("")
    const [option1,setOption1]=useState("")
    const [option2,setOption2]=useState("")
      
    useEffect(() => {
      setIsAccountConnceted(isConnected);
      if (accountAddress) {
        setAddress(accountAddress);
      }
      if(chain){
        setmychain(chain)
      }
      if(!isConnected){
        setAddress(null);
      }
    }, [accountAddress,isConnected,chain]);


 

    
    const {data1} = useContractRead({
        address: contract_addr,
        abi: abi,
        functionName: 'listQuestions',
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

      const {data2} = useContractRead({
        address: contract_addr,
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
 


    </div>
         
        </>
          
      ) : (
        <p>Please connect your wallet to view the page</p>
      )}


 

          
        

</div>



    

    
    );
  }
  