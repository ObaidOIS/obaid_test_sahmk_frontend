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
import OtpInput from "react-otp-input";

const OtpModal = ({
  isOpen,
  onClose,
  userData,
  previousPage,
  setErrorAlert,
  setErrorMessage,
  setSuccessAlert,
  setSuccessMessage,
  currentPlan,
  selectedOption,
  handleSubmitCheckboxes,
}) => {
  const router = useRouter();
  const [timer, setTimer] = useState(
    moment.duration(0, "hours").add(1, "minute")
  );
  const [timerActive, setTimerActive] = useState(true);
  // State for each OTP input
  // const [otp, setOtp] = useState(Array(4).fill(""));
    const [otp, setOtp] = useState("");
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
      const response = await apiCall("/auth/otp/", "POST", data, previousPage);

      setOtpId(response.result.id);
      console.log(response, "hello");
      setSuccessAlert(true);
      setSuccessMessage(
        resend !== undefined && resend == true
          ? "تمت إعادة إرسال الرمز إلى هاتفك المحمول بنجاح"
          : "تم ارسال الرمز إلى جوالك بنجاح"
      );
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

  useEffect(() => {
    const handleFocus = () => {
      window.scrollTo(0, 0);
    };

    // Assuming 'yourInput' is the ref to your input element
    const inputElement = document.getElementById('otpmodal');

    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
      }
    };
  }, []);


  const resendText = ` ${timer.minutes()}:${timer.seconds()}`;

  const handleSubmit = async (value) => {
    // Combine OTP digits into a single variable
    const enteredOTP = value == "undefined" ? otp.join("") : value;

    console.log(enteredOTP, "hello id");
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

      if (otpResponse.error) {
        setErrorAlert(true);
        setErrorMessage("رمز OTP الذي أدخلته غير صحيح");
      } else {
        if (
          otpResponse.result.access_token &&
          otpResponse.result.refresh_token
        ) {
          // Store tokens in localStorage
          localStorage.setItem("accessToken", otpResponse.result.access_token);
          localStorage.setItem(
            "refreshToken",
            otpResponse.result.refresh_token
          );

          // Redirect based on the previousPage
          if (previousPage === "signup") {
            handleSubmitCheckboxes();
            currentPlan == "الباقة المجانية" ||
            (currentPlan.title ? currentPlan.title : selectedOption) ==
              "الباقة المجانية"
              ? router.push("/userprofile")
              : router.push(`/auth/order?previousPage=${previousPage}`
              );
          } else if (previousPage === "signin") {
            router.push("/userprofile");
            if (localStorage.getItem("page")) {
              localStorage.removeItem("page");
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log(otp, "otp value");
    if(otp.length == 4){
      handleSubmit(otp)
    }
  
  }, [otp])

    useEffect(() => {
    const otpInputElements = document.querySelectorAll('.otpInput');
    
    otpInputElements.forEach((inputElement) => {
      // Change autocomplete attribute for each input with class 'otpInput'
      // inputMode
      inputElement.setAttribute('inputmode', 'numeric');
      inputElement.setAttribute('autocomplete', 'one-time-code');
    });
  }, []);

  return (
    <div>
      {/* <button onClick={handleCopyClick}>Copy Text</button> */}
      <div className="flex justify-center">
        <Image
          loading="eager"
          src="/assets/icons/mail-fast.svg"
          width={32}
          height={32}
          className=""
          alt="img"
          priority
        />
      </div>
      <p className="text-sm font-medium text-center mt-8">
        يرجى إدخال الرمز المرسل إلى جوالك
      </p>
      <div className="gap-4 my-5" dir="ltr">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          inputStyle={"block appearance-none otpInput !w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primaryColor sm:text-sm sm:leading-6"}
          shouldAutoFocus={true}
          defaultValue=""
          containerStyle="!grid grid-cols-4 gap-4"
          // renderSeparator={<span> &nbsp;</span>}
          renderInput={(props) => <input {...props} id="otpmodal" />}
        />
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
