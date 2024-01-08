"use client";
import React, { useState } from "react";
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

const LoginCardForm = () => {
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");

  const [successAlert, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("success");

  const countryCodes = [
    {
      name: "Saudi Arabia",
      dial_code: "+966",
      icon: <SA title="Saudi Arabia" className="md:w-6 md:h-6 w-4 h-4" />,
    },
    {
      name: "Bahrain",
      dial_code: "+973",
      icon: <BH title="Bahrain" className="md:w-6 md:h-6 w-4 h-4" />,
    },
    {
      name: "Kuwait",
      dial_code: "+965",
      icon: <KW title="Kuwait" className="md:w-6 md:h-6 w-4 h-4" />,
    },
    {
      name: "Oman",
      dial_code: "+968",
      icon: <OM title="Oman" className="md:w-6 md:h-6 w-4 h-4" />,
    },
    {
      name: "Qatar",
      dial_code: "+974",
      icon: <QA title="Qatar" className="md:w-6 md:h-6 w-4 h-4" />,
    },
    {
      name: "UAE",
      dial_code: "+971",
      icon: <AE title="UAE" className="md:w-6 md:h-6 w-4 h-4" />,
    },
    {
      name: "PK",
      dial_code: "+92",
      icon: <PK title="PK" className="md:w-6 md:h-6 w-4 h-4"/>,
    },
  ];

  const [activeItem, setActiveItem] = useState(null);
  const [userData, setUserData] = useState({
    countryCode: activeItem || "+966",
    phoneNumber: "",
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

  const handleOpenOtpModal = () => {
    if (userData.phoneNumber) {
      setIsOtpModalOpen(true);
    } else {
      setErrorMessage("Please enter a phone number");
      setErrorAlert(true);
    }
  };

  const handleDataChange = (fieldName, value) => {
    setUserData({
      ...userData,
      [fieldName]: value,
    });
  };

  return (
    <>
      <div>
        {successAlert == true && (
          <MessageAlert
            setOpenModal={setSuccessAlert}
            title="نجاح"
            message={successMessage}
            alertStyle="fixed top-5 right-2 text-primaryColor bg-teal-50 "
            icon={
              <CheckCircleIcon
                className="h-5 w-5 text-primaryColor"
                aria-hidden="true"
              />
            }
          />
        )}
        {errorAlert == true && (
          <MessageAlert
            setOpenModal={setErrorAlert}
            title="خطأ"
            message={errorMessage}
            alertStyle="fixed top-5 right-2 text-redColor bg-red-50 "
            icon={
              <XCircleIcon
                className="h-5 w-5 text-redColor"
                aria-hidden="true"
              />
            }
          />
        )}
      </div>
      <div>
        <SimpleAlertModalUI
          onClose={() => setIsOtpModalOpen(false)}
          isOpen={isOtpModalOpen}
          content={
            <OtpModal
              setErrorMessage={setErrorMessage}
              setErrorAlert={setErrorAlert}
              isOpen={isOtpModalOpen}
              userData={userData}
              previousPage={"signin"}
              setSuccessAlert={setSuccessAlert}
              setSuccessMessage={setSuccessMessage}
            />
          }
        />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-8">
        <div className=" sm:mt-0 mt-10 sm:mx-auto sm:w-full sm:max-w-[500px]">
          <div className="bg-white relative px-6 pt-0 pb-20 sm:py-12 border border-lightGreyColor rounded-2xl sm:px-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="lg:container w-full text-center ">
                <div className="sm:visible invisible flex items-center justify-center">
                  <Link href="/">
                    <Image
                      src="/assets/logos/logo.svg"
                      width={140}
                      height={60}
                      className="cursor-pointer"
                      alt="Logo"
                    />
                  </Link>
                </div>
                <p className="text-lg leading-7 mt-2 ">
                  مرحبا بك في نظام سهمك الذكي
                </p>
              </div>
            </div>
            <div className="mt-8 text-center mb-14 sm:mb-10">
              <div className="text-3xl font-semibold mb-5 leading-none">
                تسجيل الدخول لحسابك
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-end gap-4">
                  <div className="flex-grow ">
                    <InputFieldUI
                      label="رقم الجوال"
                      name="phone-tel"
                      value={userData.phoneNumber}
                      handleChange={(e) => {
                        const value = e.target.value;
                        // Check if the value is a number
                        if (/^\d*$/.test(value)) {
                          handleDataChange("phoneNumber", value);
                        }
                      }}
                    />
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
                    onClick={handleOpenOtpModal}
                    button="تسجيل الدخول"
                    buttonStyle="py-3 rounded-md !font-normal w-full justify-center mt-6"
                  />
                </div>
              </div>
            </div>
            <Image
              src="/assets/images/gradient-bottom.svg"
              width={170}
              height={170}
              className="absolute -bottom-9 sm:-bottom-12 w-[calc(100%-0.75rem)] left-0 right-0 -z-30"
              alt="img"
            />
          </div>

          <div className="mt-32 text-center sm:flex items-center gap-6 justify-center text-sm text-gray-500">
            <div className="font-semibold leading-6 text-secondaryColor hover:text-primaryColor">
              إذا كنت لاتملك حساب يمكنك إنشاء حسابك
            </div>
            <Link href="/auth/register">
              <OutlineButton
                buttonStyle="!rounded-2xl mt-5 sm:mt-0 !border-secondaryColor !px-3"
                button="أنشأ حسابك"
                icon={
                  <Image
                    src="/assets/icons/green-right-arrow.svg"
                    width={12}
                    height={12}
                    className="mr-5"
                    alt="img"
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
