"use client";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import apiCall from "@/components/common/api";
import {
  getFullPhoneNumber,
  mergeKeysIntoThird,
} from "@/components/common/utils";
import { useRouter } from "next/navigation";

const OtpModal = ({
  isOpen,
  onClose,
  userData,
  previousPage,
  setErrorAlert,
  setErrorMessage,
  setSuccessAlert,
  setSuccessMessage,
}) => {
  const router = useRouter();
  const [timer, setTimer] = useState(
    moment.duration(0, "hours").add(1, "minute")
  );
  const [timerActive, setTimerActive] = useState(true);
  // State for each OTP input
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [otpId, setOtpId] = useState("");

  const phoneNumber = getFullPhoneNumber(userData);
  userData = mergeKeysIntoThird(userData, "firstName", "lastName", "name");

  useEffect(() => {
    let interval;

    const startTimer = () => {
      interval = setInterval(() => {
        setTimer((prevTimer) =>
          moment.duration(prevTimer).subtract(1, "second")
        );
      }, 1000);
    };

    if (timerActive) {
      // Start the timer only when timerActive is true
      startTimer();
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timerActive]); // Run effect whenever timerActive changes

  const sendOtp = async (resend) => {
    if (isOpen && phoneNumber) {
      const data = {
        action: "send",
        number: phoneNumber, // assuming phoneNumber is the key in userData
      };
      const response = await apiCall(
        "/auth/otp/",
        "POST",
        data,
        previousPage
      );

      setOtpId(response.result.id);
      // setErrorAlert(true);
      // setErrorMessage("phone no correct karo");
      // onClose();
      setSuccessAlert(true);
      setSuccessMessage(resend !== undefined && resend == true ? "تمت إعادة إرسال الرمز إلى هاتفك المحمول بنجاح" : "تم ارسال الرمز إلى جوالك بنجاح");
    }
  };

  useEffect(() => {
    // Call the function when component mounts or isOpen/userData changes
    sendOtp();
  }, [phoneNumber, isOpen]);

  const handleResend = () => {
    sendOtp(true);
    setTimer(moment.duration(0, "hours").add(1, "minute")); // Reset the timer
    setTimerActive(true); // Start the timer
  };

  const handleInputChange = (value, index) => {

    // Update the corresponding OTP digit
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
  if (value === "") {
    // If the first digit is removed, focus on the same input
    document.getElementById(`code-${index - 1}`)?.focus();
  }

    console.log(index, value, "hello");
    if (index == 3 && value !== "") {
    // if (newOtp.length == 4 && value !== "") {
      // const code = (otp + value).replace(/,/g, '');
      const code = newOtp.join('');
      console.log(code, "hello")
      handleSubmit(code);
    }

  };

  const resendText = ` ${timer.minutes()}:${timer.seconds()}`;

  const focusNextInput = (e, prevId, nextId, index) => {
    const value = e.target.value;

    // Ensure input is numeric
    if (!value || isNaN(value)) {
      return; // early return if not a number
    }

    // Update OTP
    handleInputChange(value, index);

    const inputLength = value.length;
    if (inputLength === 1) {
      document.getElementById(nextId)?.focus();
    } else if (inputLength === 0) {
      document.getElementById(prevId)?.focus();
      handleInputChange("", index - 1);
    }
  };

  const handleSubmit = async (value) => {
    // Combine OTP digits into a single variable
    // const enteredOTP = otp.join("");
    const enteredOTP = value == "undefined" ? otp.join("") : value;

    // console.log("im here too" ,otpId, enteredOTP, value, otp.join(""), "hello")

    if (otpId && enteredOTP.length === 4) {
      // Ensure otpId is set and OTP is complete
      const otpPayload = {
        action: "verify",
        number: phoneNumber,
        code: enteredOTP,
        page: previousPage,
        otp_id: otpId,
        ...userData,
      };

      // Call the API to verify the OTP
      const otpResponse = await apiCall(
        "/auth/otp/",
        "POST",
        otpPayload,
        previousPage
      );

      console.log(otpResponse, "hello");

      if(otpResponse.error){
        setErrorAlert(true);
        setErrorMessage("رمز OTP الذي أدخلته غير صحيح");
      }
        else{
      if (otpResponse.result.access_token && otpResponse.result.refresh_token) {
        // Store tokens in localStorage
        localStorage.setItem("accessToken", otpResponse.result.access_token);
        localStorage.setItem("refreshToken", otpResponse.result.refresh_token);

        // Redirect based on the previousPage
        if (previousPage === "signup") {
          router.push("/auth/order");
        } else if (previousPage === "signin") {
          router.push("/userprofile");
          if (localStorage.getItem('page')) { localStorage.removeItem('page') }
        }
      }
    }
    }
  };


  const handleKeyUp = (e, prevId, nextId, index) => {
    console.log(prevId, "hello");
    // Handle backspace
    if (e.code === "Backspace" && index > 0) {
      // document.getElementById(prevId)?.setAttribute("id", `code-${index - 1}`);
      document.getElementById(prevId)?.focus();
      handleInputChange("", index);
      return;
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <Image
          src="/assets/icons/mail-fast.svg"
          width={32}
          height={32}
          className=""
          alt="img"
        />
      </div>
      <p className="text-sm font-medium text-center mt-8">
        يرجى إدخال الرمز المرسل إلى جوالك
      </p>
      <div className="flex gap-4 my-5" dir="ltr">
        {Array.from({ length: 4 }, (_, index) => (
          <InputFieldUI
            key={index}
            maxlength="1"
            handleChange={(e) => {
              focusNextInput(
                e,
                `code-${index - 1}`, // Previous ID
                `code-${index + 1}`, // Next ID
                index // Current index for OTP
              );
            }}
            id={`code-${index}`}
            buttonStyle="text-center"
            inputmode="numeric"
            handleKeyUp={(e)=>{
              console.log(e.keyCode, "hello"); 
              handleKeyUp(
                  e,
                `code-${index - 1}`, // Previous ID
                `code-${index + 1}`, // Next ID 
                index
              )}}
          />
        ))}
      </div>
      <div>
        <p
          onClick={() => {
            timer.asSeconds() > 0 ? "" : handleResend();
          }}
          className={` ${timer.asSeconds() > 0
              ? ""
              : " hover:text-darkGreyColor underline cursor-pointer"
            } text-sm font-medium text-right`}
        >
          {timer.asSeconds() > 0
            ? ` إعادة ارسال الرمز بعد ${resendText} `
            : `إعادة إرسال OTP مرة أخرى`}{" "}
        </p>
        {/* <p className='text-sm font-medium text-right'>  22:00</p> */}
      </div>
      <div>
        <PrimaryButton
          button="دخول"
          buttonStyle="py-3 rounded-md !font-normal w-full justify-center mt-6"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default OtpModal;
