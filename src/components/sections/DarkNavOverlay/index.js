"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import React from 'react';
import SuccessAlert from "@/components/widgets/SuccessAlert";


const DarkNavOverlay = ({ children, page, setPage, toggleSidebar, successAlert, setSuccessAlert, deactivateAlert, setDeactivateAlert }) => {
  
  return (
    <div>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32 bg-custome">
            <Image
              src="/assets/images/userprofile-layer-design.png"
              width={500}
              height={50}
              className=" w-full absolute top-[-30px] h-[340px]"
              alt="Background Image"
            />
          <header className="w-full relative">
            <div className="flex p-6">
              <div
                className="lg:hidden flex flex-1 justify-start "
                onClick={() => toggleSidebar()}
              >
                <Bars3Icon className="h-6 w-6 text-whiteColor"  />
              </div>
              <div className="lg:hidden flex flex-1 justify-end">
                <div className="bg-whiteColor/10 rounded-lg ml-2 cursor-pointer">
                <p className=" text-whiteColor py-1.5 px-2 text-sm">EN</p>
                </div>
                <div className="bg-whiteColor/10 cursor-pointer flex justify-center py-1.5 px-2 items-center rounded-lg">
                <Image
                  src="/assets/icons/white-logout.svg"
                  width={16}
                  height={16}
                  alt="Image"
                />
                </div>
              </div>
            </div>
            
            {successAlert == true ? 
            <SuccessAlert setOpenModal={setSuccessAlert}
            message="تم التنشيط بنجاح!" alertStyle="fixed top-5 right-2" /> : "" }
            
            {deactivateAlert == true ? 
            <SuccessAlert message="تم التعطيل بنجاح!" setOpenModal={setDeactivateAlert} alertStyle="fixed top-8 right-4" /> : "" }

            <div className="lg:container flex items-center pt-8 justify-center mx-auto">
            
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/logos/logo.svg"
                  width={160}
                  height={90}
                  className="cursor-pointer"
                  alt="Logo"
                />
              </Link>
            </div>
              <div
                className={`text-center mb-8 flex justify-center mt-12 text-whiteColor`}
              >
                <div className="max-w-2xl ">
                  <div className="text-2xl mb-5 leading-none">
                    مرحبا بك <span className="text-primaryColor">عبدالرحمن،</span>{" "}
                    في نظام سهمك
                  </div>
                  <p className=" font-small text-gray-400/60 text-sm ">
                    يمكنك إدارة حسابك والاطلاع على تفاصيل الاسهم وباقتك
                  </p>
                </div>
              </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto xl:w-6/12 lg:w-8/12 max-w-7xl pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg text-sm px-3 py-6 sm:px-6">
              {page.name !== "userprofile" ? (
                <div onClick={()=>{page.name == "payment" ? setPage({ name: "my-account", value: "باقتي وحسابي" }) : setPage({name:"userprofile", value:"الخدمات الرئىيسية"})}} className=" flex items-center self-center align-middle gap-4 cursor-pointer text-whiteColor font-medium mb-5 leading-none">
                 <Image src="/assets/icons/white-right-arrow.svg" width={16} height={16} className="" alt="img" /> عودة للقائمة 
                </div>
              ) : (
                ""
              )}
              <div className="text-1xl text-whiteColor font-medium mb-5 leading-none">
              {page.value}
            </div>
              {children}
            </div>
          </div>
        </main>
      </div>
      
    </div>
  );
};

export default DarkNavOverlay;
