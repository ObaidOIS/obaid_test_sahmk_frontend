import OutlineButton from "@/components/widgets/OutlineButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <div className="mx-auto relative gap-5 h-screen bg-darkNavyColor ">
      <Image loading="eager"  
            src="/assets/images/login-layer-design.svg"
            layout="fill"
            className=" w-screen absolute top-0 bottom-0 left-0 z-20 right-0"
            alt="Background Image"
            priority
          />
      <div className="relative z-[20]">
          {/* <Image loading="eager"  
            src="/assets/images/login-layer-design.svg"
            layout="fill"
            className=" w-screen absolute top-0 bottom-0 left-0 right-0"
            alt="Background Image"
            priority
          /> */}
          {/* <header className="w-full relative py-20"> */}
          <div className="w-full relative py-8 z-40">
          {children}
          </div>
          <div className="bottom-[-90px] z-30 inset-x-0 text-center absolute items-center gap-6 justify-center text-sm text-gray-500">
            <div className="leading-6 mb-3 text-white">
              إذا كنت لاتملك حساب يمكنك إنشاء حسابك
            </div>
            <Link href="/auth/register">
              <OutlineButton
                buttonStyle="!rounded-lg mt-5 sm:mt-0 !border-primaryColor !text-primaryColor !px-3"
                button="أنشأ حسابك"
                icon={
                  <Image loading="eager"  
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
  );
};

export default LoginLayout;
