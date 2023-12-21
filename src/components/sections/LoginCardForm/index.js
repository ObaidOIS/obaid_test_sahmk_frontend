"use client";
import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import PhoneNumberUI from "@/components/widgets/PhoneNumberUI";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import DropdownUI from "@/components/widgets/DropdownUI";
import OutlineButton from "@/components/widgets/OutlineButton";


const LoginCardForm = () => {

  const countryCodes = [
    {
    "name": "Bahrain",
    "dial_code": "+973"
    },
    {
    "name": "Kuwait",
    "dial_code": "+965"
    },
    {
    "name": "Oman",
    "dial_code": "+968"
    },  
    {
    "name": "Qatar",
    "dial_code": "+974"
    },
    {
    "name": "Saudi Arabia",
    "dial_code": "+966"
    },
    {
    "name": "UAE",
    "dial_code": "+971"
    }
];

  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-8">
        <div className=" sm:mt-0 mt-10 sm:mx-auto sm:w-full sm:max-w-[500px]">
          <div className="bg-white relative px-6 pt-0 pb-20 sm:py-12 border border-lightGreyColor rounded-2xl sm:px-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="lg:container w-full text-center ">
                <div className="sm:visible invisible flex items-center justify-center">
                  <Image
                    src="/assets/logos/logo.svg"
                    width={140}
                    height={60}
                    className="cursor-pointer"
                    alt="Logo"
                  />
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
            <form className="space-y-4" action="#" method="POST">
              <div>
                <div className="flex items-end gap-4">
                  <div className="flex-grow ">
                <InputFieldUI label="رقم الجوال" name="phone-tel"  />
                </div>
                <DropdownUI dataList={countryCodes} isOpen={isOpen} handleMenuItemClick={handleMenuItemClick} handleToggleDropdown={handleToggleDropdown} activeItem={activeItem} setActiveItem={setActiveItem} setIsOpen={setIsOpen} />
                </div>
                <PrimaryButton
                  button="تسجيل الدخول"
                  buttonStyle="py-3 rounded-md !font-normal w-full justify-center mt-6"
                />
              </div>
            </form>
            <Image
            src="/assets/images/gradient-bottom.svg"
            width={170}
            height={170}
            className="absolute -bottom-9 sm:-bottom-12 w-[calc(100%-0.75rem)] left-0 right-0 -z-30"
            alt="img"
          />
          </div>

          <div className="mt-32 text-center flex items-center gap-6 justify-center text-sm text-gray-500">
            <div
              className="font-semibold leading-6 text-secondaryColor hover:text-primaryColor"
            >
              إذا كنت لاتملك حساب يمكنك إنشاء حسابك
            </div>
            <Link href="/auth/register">
            <OutlineButton buttonStyle="!rounded-2xl !border-secondaryColor !px-3" button="أنشأ حسابك"  icon={<Image src="/assets/icons/green-right-arrow.svg" width={12} height={12} className="mr-5" alt="img" />}/>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCardForm;
