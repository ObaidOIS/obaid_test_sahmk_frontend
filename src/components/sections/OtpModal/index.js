"use client";
import InputFieldUI from '@/components/widgets/InputFieldUI'
import PrimaryButton from '@/components/widgets/PrimaryButton'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const OtpModal = () => {
  
  const [timer, setTimer] = useState(moment.duration(0, 'hours').add(1, 'minute'));
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval;
  
    const startTimer = () => {
      interval = setInterval(() => {
        setTimer((prevTimer) => moment.duration(prevTimer).subtract(1, 'second'));
      }, 1000);
    };
  
    if (timerActive) { // Start the timer only when timerActive is true
      startTimer();
    }
  
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timerActive]); // Run effect whenever timerActive changes

  const handleResend = () => {
    setTimer(moment.duration(0, 'hours').add(1, 'minute')); // Reset the timer
    setTimerActive(true); // Start the timer
  };


  const resendText = ` ${timer.minutes()}:${timer.seconds()}`;


  const focusNextInput = ( e, prevId, nextId) => {
    console.log('Event:', e.target.value.length);
    // console.log('PrevId:', prevId);
    // console.log('NextId:', nextId);
    if (e.target.value.length === 0) {
        document.getElementById(prevId).focus();
    } else {
        document.getElementById(nextId)?.focus();
    }
}

console.log(resendText);
  return (
    <div>
        <div className='flex justify-center'>
            <Image src="/assets/icons/mail-fast.svg" width={32} height={32} className="" alt="img" />
        </div>
        <p className='text-sm font-medium text-center mt-8'>يرجى إدخال الرمز المرسل إلى جوالك</p>
        <div className='flex gap-4 my-5' dir="ltr">
            <InputFieldUI maxlength="1" inputmode="numeric" onkeyup={focusNextInput} paramOne='code-1' paramTwo='code-2' id="code-1" buttonStyle="text-center" />
            <InputFieldUI maxlength="1" inputmode="numeric" onkeyup={focusNextInput}  paramOne='code-1' paramTwo='code-3' id="code-2" buttonStyle="text-center" />
            <InputFieldUI maxlength="1" inputmode="numeric" onkeyup={focusNextInput}  paramOne='code-2' paramTwo='code-4' id="code-3" buttonStyle="text-center" />
            <InputFieldUI maxlength="1" inputmode="numeric" onkeyup={focusNextInput}  paramOne='code-3' paramTwo='code-4' id="code-4" buttonStyle="text-center" />
            </div>
            <div>
            <p onClick={()=>{timer.asSeconds() > 0 ? "" : handleResend()}} className={` ${timer.asSeconds() > 0 ? "" : " hover:text-darkGreyColor underline cursor-pointer"} text-sm font-medium text-right`}>{timer.asSeconds() > 0 ? ` إعادة ارسال الرمز بعد ${resendText} `  : `إعادة إرسال OTP مرة أخرى`} </p>
             {/* <p className='text-sm font-medium text-right'>  22:00</p> */}
            </div>
            <div>
                <PrimaryButton
                  button="دخول"
                  buttonStyle="py-3 rounded-md !font-normal w-full justify-center mt-6" 
                />
            </div>

    </div>
  )
}

export default OtpModal
