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

  useEffect(() => {
    // Effect for calling OTP API when the modal opens
    const sendOtp = async () => {
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
        setSuccessMessage("تم ارسال الرمز إلى جوالك بنجاح");
      }
    };



    // Call the function when component mounts or isOpen/userData changes
    sendOtp();
  }, [phoneNumber, isOpen]);

  const handleResend = () => {
    setTimer(moment.duration(0, "hours").add(1, "minute")); // Reset the timer
    setTimerActive(true); // Start the timer
  };

  const handleInputChange = (value, index) => {
    if (index == 3 && value !== "") {
      const code = (otp+value).replace(/,/g, '');;
      handleSubmit(code);
    }
    // Update the corresponding OTP digit
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    console.log(value, "hello")
    

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
    }
  };

  const handleSubmit = async (value) => {
    // Combine OTP digits into a single variable
    console.log(value);
    // const enteredOTP = otp.join("");
    const enteredOTP = value == "undefined" ? otp.join("") : value;
    console.log(value, "hello me")

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

      if (otpResponse.result.access_token && otpResponse.result.refresh_token) {
        // Store tokens in localStorage
        localStorage.setItem("accessToken", otpResponse.result.access_token);
        localStorage.setItem("refreshToken", otpResponse.result.refresh_token);

        // Handle additional success logic (navigation, user feedback, etc.)
        console.log("OTP verified successfully");

        // Redirect based on the previousPage
        if (previousPage === "signup") {
          router.push("/auth/order");
        } else if (previousPage === "signin") {
          router.push("/userprofile");
        }
      } else {
        // Handle case where OTP is wrong or verification fails
        console.error("OTP Verification Failed:", otpResponse);
      }
    } else {
      console.log("Complete OTP or valid OTP ID is required");
    }
  };

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
            handleChange={(e) =>{
              focusNextInput(
                e,
                `code-${index}`, // Previous ID
                `code-${index + 2}`, // Next ID
                index // Current index for OTP
              );
            }}
            id={`code-${index + 1}`}
            buttonStyle="text-center"
            inputmode="numeric"
          />
        ))}
      </div>
      <div>
        <p
          onClick={() => {
            timer.asSeconds() > 0 ? "" : handleResend();
          }}
          className={` ${
            timer.asSeconds() > 0
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
