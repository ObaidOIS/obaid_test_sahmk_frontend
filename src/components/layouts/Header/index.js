"use client";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { isAuthenticated } from "@/components/common/utils";  

const Header = ({ toggleSidebar }) => {
  const navLinks = [
    { name: "الرئيسية", link: "/#" },
    { name: "الخدمات", link: "/#services" },
    { name: "اشتراكاتنا", link: "/#pricing" },
    { name: "من نحن", link: "/#try-us" },
    { name: "تواصل معنا", link: "/contactus#" },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const [isAuthenticate, setIsAuthenticate] = useState(null)
  useEffect(() => {
    setIsAuthenticate(isAuthenticated());
  }, []);

  return (
    <>
      <header className="w-full">
        <Image loading="eager"  
          src="/assets/images/beam-bg-top.png"
          width={300}
          height={200}
          className="w-full absolute z-[-99999] top-0"
          alt="img"
          priority
        />
        <div className="lg:container flex items-center p-6 mx-auto flex-row">
          <Link href="/#" className="flex items-center">
            <Image loading="eager"  
              src="/assets/logos/logo.svg"
              width={100}
              height={33}
              className=" cursor-pointer"
              alt="img"
              priority
            />
          </Link>
          <nav className="lg:flex hidden items-center justify-center text-base md:ml-auto mr-5">
            {navLinks.map((item, index) => {
              return (
                <a
                  scroll={true}
                  href={item.link}
                  key={index}
                  className={`${
                    activeTab === index ? "" : ""
                  } cursor-pointer mr-8 `}
                >
                  <p
                    className={`cursor-pointer px-4 py-2 truncate ${
                      activeTab === index
                        ? "text-teal-500 border-b-2 border-teal-500 hover:border-teal-700 font-normal hover:text-teal-700"
                        : "hover:text-black font-normal"
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    {item.name}
                  </p>
                </a>
              );
            })}
          </nav>
          <div
            className="lg:hidden flex items-center flex-1 justify-end"
          >
            {isAuthenticate != null && isAuthenticate == false ?
            <div className="ml-4 inline">
              <Link href="/auth/register" >
                <PrimaryButton
                  button="سجل معنا"
                  buttonStyle="!py-2"
                />
              </Link>
            </div> : 
            <div className="ml-4 inline">
            <Link href={isAuthenticate == true ? "/userprofile" : "/auth/login"} 
              onClick={(e)=>{if(isAuthenticate == true && localStorage.getItem('page')){localStorage.removeItem('page')}}} className="hover:text-gray-900 font-normal">
              {" "}
              {/* <PrimaryButton button="تسجل الدخول" buttonStyle={`font-normal`} /> */}
              <PrimaryButton
                  button="تسجل الدخول"
                  buttonStyle="!py-2"
                />
              {/* تسجل الدخول{" "} */}
            </Link>
            </div>}
            
            <Bars3Icon className="h-6 w-6" onClick={() => toggleSidebar()} />
          </div>
          <div className="items-center h-full lg:flex hidden ">
            <Link href={isAuthenticate == true ? "/userprofile" : "/auth/login"} 
              onClick={(e)=>{if(isAuthenticate == true && localStorage.getItem('page')){localStorage.removeItem('page')}}} className="hover:text-gray-900 font-normal">
              {" "}
              {isAuthenticate == false &&
            "تسجل الدخول" }
              {isAuthenticate == true &&
              <PrimaryButton button="تسجل الدخول" buttonStyle={`font-normal`} /> }
            </Link>
            {(isAuthenticate != null && isAuthenticate == false) &&
            <div className="mr-4 inline">
            <Link href="/auth/register" >
              <PrimaryButton button="سجل معنا" buttonStyle={`font-normal`} />
              </Link>
            </div>}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
