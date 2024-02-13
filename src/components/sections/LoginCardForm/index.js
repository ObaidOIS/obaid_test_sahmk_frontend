"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import DropdownUI from "@/components/widgets/DropdownUI";
import OutlineButton from "@/components/widgets/OutlineButton";
import { BH, KW, OM, QA, SA, AE, PK } from "country-flag-icons/react/3x2";
import OtpModal from "../OtpModal";
import SimpleAlertModalUI from "@/components/widgets/SimpleAlertModalUI";
import MessageAlert from "@/components/widgets/MessageAlert";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import apiCall from "@/components/common/api";
import { getFullPhoneNumber, debounce } from "@/components/common/utils";
import NotificationAlert from "@/components/widgets/NotificationAlert";

const LoginCardForm = ({
  successMessage, 
  setSuccessMessage,
  successAlert,
  setSuccessAlert,
  warningMessage, 
  setWarningMessage,
  errorAlert, 
  setErrorAlert,
  errorMessage,
  setErrorMessage,
  warningAlert,
  setWarningAlert,
}) => {

  const [phoneNumberNotExists, setPhoneNumberNotExists] = useState(false);

  const countryCodes = [
    {
      name: "Saudi Arabia",
      dial_code: "+966",
      icon: (
        <Image unoptimized={true}  loading="eager"  
          src="/assets/icons/saudi-arabia-flag.png"
          width="24"
          height="24"
          alt="Saudi Arabia"
          className="w-5 h-5"
          priority
        />
      ),
    },
    {
      name: "Bahrain",
      dial_code: "+973",
      icon: <BH title="Bahrain" className="w-6 h-6" />,
    },
    {
      name: "Kuwait",
      dial_code: "+965",
      icon: <KW title="Kuwait" className="w-6 h-6" />,
    },
    {
      name: "Oman",
      dial_code: "+968",
      icon: <OM title="Oman" className="w-6 h-6" />,
    },
    {
      name: "Qatar",
      dial_code: "+974",
      icon: <QA title="Qatar" className="w-6 h-6" />,
    },
    {
      name: "UAE",
      dial_code: "+971",
      icon: <AE title="UAE" className="w-6 h-6" />,
    },
    {
      name: "PK",
      dial_code: "+92",
      icon: <PK title="PK" className="w-6 h-6" />,
    },
  ];

  const [activeItem, setActiveItem] = useState(null);
  const [userData, setUserData] = useState({
    countryCode: activeItem || "+966",
    phoneNumber: "",
  });

  const [validate, setValidate] = useState({
    phone: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item) => {
    handleDataChange("countryCode", item.dial_code);
    setActiveItem(item);
    setIsOpen(false);
  };

  const handleOpenOtpModal = async (e) => {
  
    e.preventDefault();
    const cleanedPhoneNumber = cleanPhoneNumber(userData.phoneNumber);
    setUserData({
      ...userData,
      phoneNumber: cleanedPhoneNumber,
    });
    const phoneNumberExists = await checkPhoneNumber();

    if (phoneNumberExists) {
      if (cleanedPhoneNumber) {
        setIsOtpModalOpen(true);
      } else {
        setErrorMessage("الرجاء إدخال رقم هاتف");
        setErrorAlert(true);
      }
    } else {
      setWarningMessage(
        "الرجاء التسجيل، هذا الرقم غير موجود." +
          " " +
          userData.countryCode +
          " " +
          userData.phoneNumber
      );
      setWarningAlert(true);
    }
  };

  const handleDataChange = (fieldName, value) => {
    setUserData({
      ...userData,
      [fieldName]: value,
    });
  };

  const cleanPhoneNumber = (phoneNumber) => {
    // Define the prefixes to check
    const prefixesToRemove = [
      // "0",
      "966",
      "973",
      "965",
      "968",
      "974",
      "971",
      "92",
    ];

    // Check if the entered phone number starts with any of the prefixes
    const hasPrefix = prefixesToRemove.some((prefix) => {
      return phoneNumber.startsWith(prefix);
    });

    // Remove the prefix if found
    const cleanedPhoneNumber = hasPrefix
      ? prefixesToRemove.reduce(
          (number, prefix) => number.replace(new RegExp(`^${prefix}`), ""),
          phoneNumber
        )
      : phoneNumber;

    return cleanedPhoneNumber;
  };

  // Function to check if the phone number exists
  const checkPhoneNumber = async () => {
    if (userData.phoneNumber.length >= 9) {
      const fullPhoneNumber = getFullPhoneNumber(userData);
      const response = await apiCall(
        `/auth/api/check_phone_number/?phone_number=${fullPhoneNumber}`,
        "GET"
      );
      if (response && response.result && response.result.exists) {
        setPhoneNumberNotExists(false);
      } else {
        setPhoneNumberNotExists(true);
      }
      return response.result.exists;
    }
  };

  return (
    <>
      <div>
      <SimpleAlertModalUI
          onClose={() => setIsOtpModalOpen(false)}
          isOpen={isOtpModalOpen}
          content={
            <OtpModal
              setErrorMessage={setErrorMessage}
              setErrorAlert={setErrorAlert}
              onClose={() => setIsOtpModalOpen(false)}
              isOpen={isOtpModalOpen}
              userData={userData}
              previousPage={"signin"}
              setSuccessAlert={setSuccessAlert}
              setSuccessMessage={setSuccessMessage}
            />
          }
        />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 sm:px-8">
        <div className=" sm:mt-0 mt-10 sm:mx-auto sm:w-full sm:max-w-[500px]">
          <div className="relative">
            <Image unoptimized={true}  loading="eager"  
              src="/assets/images/mask-left-corner-login.svg"
              width={600}
              height={600}
              className="absolute -bottom-32 -left-44 z-[-2] md:h-full md:w-full"
              alt="img"
              priority
            />
            <Image unoptimized={true}  loading="eager"  
              src="/assets/images/mask-right-corner-login.svg"
              width={600}
              height={600}
              className="absolute sm:-top-32 -top-36 left-36 z-[-2]  md:h-full md:w-full"
              alt="img"
              priority
            />
            <div className=" bg-white border border-lightGreyColor rounded-2xl px-6 py-8 sm:py-12 sm:px-12">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="lg:container w-full text-center ">
                  <div className="visible flex items-center justify-center">
                    <Link href="/">
                      <Image unoptimized={true}  loading="eager"  
                        src="/assets/logos/logo.svg"
                        width={140}
                        height={60}
                        className="cursor-pointer"
                        alt="Logo"
                        priority
                      />
                    </Link>
                  </div>
                  {/* <p className="text-lg leading-7 mt-2 ">
                  مرحبا بك في نظام سهمك الذكي
                </p> */}
                </div>
              </div>
              <div className="mt-8 text-center mb-10">
                <div className="text-xl font-medium mb-5 leading-none">
                  {/* تسجيل الدخول لحسابك */}
                  ياهلاوسهلا فيك معنا في سهمك
                </div>
              </div>
              <div className="space-y-4">
                <form>
                  <div className="flex items-end gap-4">
                    <div className="flex-grow ">
                      <InputFieldUI
                        handlePaste={()=>
                            {
                              if (/^\d*$/.test(e.clipboardData.getData('text/plain').trim())) {
                                handleDataChange("phoneNumber", e.clipboardData.getData('text/plain').trim());
                              }
                              setValidate({
                                ...validate,
                                phone: value === null || value === "",
                              });
                            }}
                        autoComplete="tel"
                        placeholder="5123456789"
                        dir="ltr"
                        label="رقم الجوال"
                        inputmode="numeric"
                        name="phone-tel"
                        value={userData.phoneNumber}
                        handleChange={(e) => {
                          const value = e.target.value;
                          // Check if the value is a number
                          if (/^\d*$/.test(value)) {
                            handleDataChange("phoneNumber", value);
                          }
                          setValidate({
                            ...validate,
                            phone: value === null || value === "",
                          });
                        }}
                        maxlength="12"
                        isValid={validate.phone}
                        required={true}
                      />
                      <p></p>
                    </div>
                    <DropdownUI
                      dataList={countryCodes}
                      isOpen={isOpen}
                      handleMenuItemClick={handleMenuItemClick}
                      handleToggleDropdown={handleToggleDropdown}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      setIsOpen={setIsOpen}
                    />
                  </div>
                  <div>
                    <PrimaryButton
                      type="submit"
                      onClick={(e) => {                        
                        handleOpenOtpModal(e);
                      }}
                      button="دخول"
                      buttonStyle="py-3 rounded-xl !font-normal text-lg w-full justify-center mt-6 !bg-mediumGreenColor"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center items-center gap-6 justify-center text-sm text-gray-500">
            <div className="leading-6 mb-5 text-white">
              إذا كنت لاتملك حساب يمكنك إنشاء حسابك
            </div>
            <Link href="/auth/register">
              <OutlineButton
                buttonStyle="!rounded-lg mt-5 sm:mt-0 !border-primaryColor !text-primaryColor !px-3"
                button="أنشأ حسابك"
                icon={
                  <Image unoptimized={true}  loading="eager"  
                    src="/assets/icons/green-right-arrow.svg"
                    width={12}
                    height={12}
                    className="mr-4"
                    alt="img"
                    priority
                  />
                }
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCardForm;
