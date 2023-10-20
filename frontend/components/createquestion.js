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

export default function CreateQuestion() {

    const [address, setAddress] = useState(null);
    const [isAccountConnected,setIsAccountConnceted]=useState(false);

    const { address: accountAddress , isConnected} = useAccount();
   


      
    useEffect(() => {
      setIsAccountConnceted(isConnected);
      if (accountAddress) {
        setAddress(accountAddress);
      }
      if(!isConnected){
        setAddress(null);
      }
    }, [accountAddress,isConnected]);


 

    
    // const {data1} = useContractRead({
    //     address: contract_addr,
    //     abi: abi,
    //     functionName: 'totalSupply',
    //     onSettled(data, error) {
    //         if(data){
    //             set_total_supply(Number(data))
    //         }
    //         if(error){
    //             console.log("failed")
    //             console.log(error)
    //         }
  
    //     },
    //   })



    //   const { config:config_whitelist ,
    //     error: prepareError,
    //     isError: isPrepareError,} = usePrepareContractWrite({
    //     address: contract_addr,
    //     abi: abi,
    //     functionName: 'allowlist_mint',
    //     args: [mint_quantity,proof],
    //     value: total_price,
    //   })

      
    //   const { data,error, isError,write } = useContractWrite(config_whitelist)
    //   const { isLoading, isSuccess } = useWaitForTransaction({
    //     hash: data?.hash,
    //   })




return (

      
<div className={styles.container}>

    <h1>Hello</h1>


          
        

</div>



    

    
    );
  }
  