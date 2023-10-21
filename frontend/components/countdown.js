import { useState, useEffect } from 'react';

export default function Countdown({ deadline }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [coundownText,setCountdownText]=useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Math.floor(new Date().getTime()/1000);
        
      const distance = deadline - now;
      console.log(deadline)
      console.log(distance)
      if (distance < 0) {
        clearInterval(intervalId);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setCountdownText("Ended")
      } else {
        const days = Math.floor(distance / ( 60 * 60 * 24));
        const hours = Math.floor((distance % (60 * 60 * 24)) / ( 60 * 60));
        const minutes = Math.floor((distance % ( 60 * 60)) / ( 60));
        const seconds = Math.floor((distance % (60)));
        setCountdown({ days, hours, minutes, seconds });
        setCountdownText(`${days} days ${hours} hr ${minutes} min`)
        if(days==0){
            setCountdownText(` d ${hours} ${minutes} min ${seconds} sec`)
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  return (
    <div>
        {coundownText}
    </div>
  );
}