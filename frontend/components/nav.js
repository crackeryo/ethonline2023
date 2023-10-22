import React, { useState } from "react";
import Link from 'next/link';



import styles from "./nav.module.css";
import { useRouter } from 'next/router';
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function NavBar({ backgroundColor = '#ffffff50' }) {
  const [click, setClick] = useState(false);
  const router = useRouter();
  const handleClick = () => setClick(!click);
  const navStyle = {
    backgroundColor: backgroundColor,
  };
  return (
    
    <>
    
      <nav style={navStyle} className={styles.navbar}>
        <div className={styles.nav_container}>
          <Link exact href="/" className={styles.nav_logo}>
          <img className={styles.logo} 
                src='/images/logo.png'
                alt="logo"
            /> Dual Dialogue
        

          </Link>

   
          <div className={styles.alignright}>
            <div className={styles.connect_button}><ConnectButton label="Connect"></ConnectButton> </div>

          </div>
        </div>
      </nav>
    </>
  );
}