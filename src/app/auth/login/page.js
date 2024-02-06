"use client";
import LoginCardForm from '@/components/sections/LoginCardForm';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/components/common/utils";  
import Image from "next/image";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import MessageAlert from '@/components/widgets/MessageAlert';
import NotificationAlert from '@/components/widgets/NotificationAlert';

const Login = () => {
  
  const router = useRouter();
  
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");

  const [warningAlert, setWarningAlert] = useState(false);
  const [warningMessage, setWarningMessage] = useState("warning");

  const [successAlert, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("success");
  
  
  useEffect(() => {
    const isAuthenticate = isAuthenticated(); 
    if (isAuthenticate) {
      router.push('/userprofile'); 
    }
  }, []);

  return (
    <div>
    {successAlert == true && (
      <MessageAlert
        setOpenModal={setSuccessAlert}
        title="نجاح"
        message={successMessage}
        alertStyle="fixed top-5 !z-50 right-2 text-primaryColor bg-teal-50 "
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
        alertStyle="fixed top-5 !z-50 right-2 text-redColor bg-red-50 "
        icon={
          <XCircleIcon
            className="h-5 w-5 text-redColor"
            aria-hidden="true"
          />
        }
      />
    )}
    {warningAlert == true && (
      <NotificationAlert
        isOpen={warningAlert}
        // isOpen={true}
        setOpenModal={setWarningAlert}
        title="خطأ"
        message={warningMessage}
        alertStyle="fixed top-5 right-2 "
        icon={
          <XCircleIcon
            className="h-5 w-5 text-mediumGreyColor"
            aria-hidden="true"
          />
        }
        button={{ name: "اذهب إلى التسجيل", href: "/auth/register" }}
      />
    )}
        <>
      <Image
        loading="eager"
        src="/assets/images/login-layer-design.svg"
        layout="fill"
        className=" w-screen sm:block hidden absolute top-0 bottom-0 left-0 z-20 right-0"
        alt="Background Image"
        priority
      />
      <Image
        loading="eager"
        src="/assets/images/login-layer-design.png"
        layout="fill"
        className=" w-screen absolute sm:hidden top-0 bottom-0 left-0 z-20 right-0"
        alt="Background Image"
        priority
      />
      <div className="h-screen flex bg-darkNavyColor overflow-clip items-center">
        <div className="mx-auto gap-5 ">
          <Image
            loading="eager"
            src="/assets/images/login-layer-design.svg"
            layout="fill"
            className=" w-screen sm:block hidden absolute top-0 bottom-0 left-0 z-20 right-0"
            alt="Background Image"
            priority
          />
          <Image
            loading="eager"
            src="/assets/images/login-layer-design.png"
            layout="fill"
            className=" w-screen sm:hidden absolute top-0 bottom-0 left-0 z-20 right-0"
            alt="Background Image"
            priority
          />
          <div className="relative z-[20]">
            <div className="w-full relative z-40">
              <LoginCardForm 
                successMessage={successMessage} 
                setSuccessMessage={setSuccessMessage}
                successAlert={successAlert} setSuccessAlert={setSuccessAlert}
                warningMessage={warningMessage} setWarningMessage={setWarningMessage}
                errorAlert={errorAlert} setErrorAlert={setErrorAlert}
                errorMessage={errorMessage} setErrorMessage={setErrorMessage}
                warningAlert={warningAlert} setWarningAlert={setWarningAlert}
             />
             </div>
          </div>
        </div>
      </div>
    </>
    </div>
  )
}

export default Login
