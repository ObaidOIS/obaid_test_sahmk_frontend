"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import React from 'react';

const DarkNavOverlay = ({ children, page, setPage, toggleSidebar }) => {
  
  return (
    <div>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <header className="w-full relative">
            <div className="flex p-6">
              <div
                className="lg:hidden flex flex-1 justify-start "
                onClick={() => toggleSidebar()}
              >
                <Bars3Icon className="h-10 w-10 text-whiteColor"  />
              </div>
              <div className="lg:hidden flex flex-1 justify-end">
                <div className="bg-whiteColor/10 rounded-lg ml-2">
                <p className=" text-whiteColor py-2 px-3">EN</p>
                </div>
                <div className="bg-whiteColor/10 flex justify-center py-2 px-3 items-center rounded-lg">
                <Image
                  src="/assets/icons/white-logout.svg"
                  width={24}
                  height={24}
                  alt="Image"
                />
                </div>
              </div>
            </div>
            {/* <Image
              src="/assets/images/layer-design.png"
              width={300}
              height={200}
              className="w-full absolute top-0 -z-0"
              alt="Background Image"
            /> */}
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
                  <div className="text-3xl mb-5 leading-none">
                    مرحبا بك <span className="text-accentColor">عبدالرحمن،</span>{" "}
                    في نظام سهمك
                  </div>
                  <p className=" font-medium text-gray-400/60 text-lg ">
                    يمكنك إدارة حسابك والاطلاع على تفاصيل الاسهم وباقتك
                  </p>
                </div>
              </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto lg:w-6/12 max-w-7xl pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg text-sm px-3 py-6 sm:px-6">
              {page.name !== "userprofile" ? (
                <div onClick={()=>{setPage({name:"userprofile", value:"الخدمات الرئىيسية"})}} className="flex items-center self-center align-middle gap-4 cursor-pointer text-whiteColor font-medium mb-5 leading-none">
                 <Image src="/assets/icons/white-right-arrow.svg" width={16} height={16} className="" alt="img" /> عودة للقائمة 
                </div>
              ) : (
                ""
              )}
              <div className="text-2xl text-whiteColor font-medium mb-5 leading-none">
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
