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
    const [voteCount1, setVoteCount1]=useState(0)
    const [voteCount2, setVoteCount2]=useState(0)
    const [answerList, setAnswerList]=useState([])
    
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
                    console.log(data)
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

    <h1>Display Answers and Vote</h1>
    
    {isAccountConnected ? (
        <>

    {/* {mychain && <div>Connected to {mychain.name}</div>} */}
    <div className={styles.answerContainer}>

            {questionid}



    </div>
         
        </>
          
      ) : (
        <p>Please connect your wallet to view the page</p>
      )}


 

          
        

</div>



    

    
    );
  }
  