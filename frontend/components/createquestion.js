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

export default function CreateQuestion() {

    const [address, setAddress] = useState(null);
    const [isAccountConnected,setIsAccountConnceted]=useState(false);

    const { address: accountAddress , isConnected} = useAccount();
    const [mychain, setmychain] = useState(null);
    const { chain, chains } = useNetwork()
    const [deadline, setDeadline] = useState(1697854852);
    const [stake,setStake]=useState(2000000000000000)
    const [entryFee,setEntryFee]=useState(100000000000000)
    const [content,setContent]=useState("Which country has the best food?")
    const [option1,setOption1]=useState("France")
    const [option2,setOption2]=useState("Japan")
      
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



      const { config:config_createQuestion ,
        error: prepareError,
        isError: isPrepareError,} = usePrepareContractWrite({
        address: contract_addr,
        abi: abi,
        functionName: 'createQuestion',
        args: [deadline,stake,entryFee,content,option1,option2],
        value: stake,
      })

      
      const { data,error, isError,write } = useContractWrite(config_createQuestion)
      const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
      })




      const handleDeadlineChange = (event) => {
        // Convert the selected option to seconds
        const selectedValue = event.target.value;
        let seconds = 0;
    
        if (selectedValue === '1day') {
          seconds = 86400;
        } else if (selectedValue === '3days') {
          seconds = 259200;
        } else if (selectedValue === '1week') {
          seconds = 604800;
        } else if (selectedValue === '1month') {
          seconds = 2592000;
        }
    
        setDeadline(seconds);
      };
    
      const handleStakeChange = (event) => {
        // Convert the entered value to the desired unit
        const enteredValue = Number(event.target.value) * 1000000000000000000;
        setStake(enteredValue);
      };
    
      const handleContentChange = (event) => {
        const enteredContent = event.target.value;
        // You can add validation here to limit the character length if needed
        setContent(enteredContent);
      };
    
      const handleOption1Change = (event) => {
        const enteredOption1 = event.target.value.slice(0, 25); // Limit to 25 characters
        setOption1(enteredOption1);
      };
    
      const handleOption2Change = (event) => {
        const enteredOption2 = event.target.value.slice(0, 25); // Limit to 25 characters
        setOption2(enteredOption2);
      };
return (

      
<div className={styles.container}>

    <h1>Hello</h1>
    
    {isAccountConnected ? (
        <>

            {mychain && <div>Connected to {mychain.name}</div>}
          


    <div className={styles.questionContainer}>
 

      <div className={styles.input}>
        <label className={styles.label}>Question:</label>
        <input
          type="text"
          value={content}
          onChange={handleContentChange}
          maxLength="100"
          className={`${styles.questionInput}`}
        />
      </div>

      <div className={styles.optionsContainer}>
        <div>
          <label className={styles.optionsLabel}>Option 1:</label>
          <input
            type="text"
            value={option1}
            onChange={handleOption1Change}
            maxLength="25"
            className={styles.optionsInput}
          />
        </div>
        <div>
          <label className={styles.optionsLabel}>Option 2:</label>
          <input
            type="text"
            value={option2}
            onChange={handleOption2Change}
            maxLength="25"
            className={styles.optionsInput}
          />
          {/* <div className={styles.optionsNote}>(max 25 char)</div> */}
        </div>

        
      </div>
      <div className={styles.input}>
        <label className={styles.label}>Bounty:</label>
        <input
          type="number"
          value={stake / 1000000000000000000}
          onChange={handleStakeChange}
        />
      </div>
      <div className={styles.input}>
        <label className={styles.label}>Deadline:</label>
        <select onChange={handleDeadlineChange}>
          <option value="1day">1 day</option>
          <option value="3days">3 days</option>
          <option value="1week">1 week</option>
          <option value="1month">1 month</option>
        </select>
      </div>

    
      <button className={styles.mint_button} disabled={!write} onClick={() => write?.()}>{isLoading ? 'Minting' : 'Create'}</button>
    </div>
         
        </>
          
      ) : (
        <p>Please connect your wallet</p>
      )}


 

          
        

</div>



    

    
    );
  }
  