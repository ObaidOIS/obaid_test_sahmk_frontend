"use client";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const Header = ({toggleSidebar}) => {

  const navLinks = [
    { name: "الرئيسية" },
    { name: "الخدمات" },
    { name: "اشتراكاتنا" },
    { name: "من نحن" },
    { name: "تواصل معنا" },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      <header className="w-full">
          <Image
            src="/assets/images/beam-bg-top.png"
            width={92}
            height={33}
            className="w-full absolute z-[-99999] top-0"
            alt="img"
          />
          <div className="lg:container flex items-center p-6 mx-auto flex-row">
            <a className="flex items-center">
              <Image
                src="/assets/logos/logo.png"
                width={100}
                height={33}
                className=" cursor-pointer"
                alt="img"
              />
            </a>
            <nav className="lg:flex hidden items-center justify-center text-base md:ml-auto mr-5">
              {navLinks.map((item, index) => {
                return (
                  <Link
                    href="#_"
                    key={index}
                    className={`${ activeTab === index ? "" : ""} cursor-pointer mr-8 `}
                  >
                    <p
                        className={`cursor-pointer px-4 py-2 truncate ${
                        activeTab === index
                            ? 'text-teal-500 border-b-2 border-teal-500 hover:border-teal-700 font-semibold hover:text-teal-700'
                            : 'hover:text-gray-900 font-medium' 
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                    {item.name}
                    </p>
                  </Link>
                );
              })}
            </nav>
            <div className="lg:hidden flex flex-1 justify-end " onClick={()=>toggleSidebar()}><IoMdMenu size={24} /></div>
            <div className="items-center h-full lg:flex hidden ">
              <a href="#_" className="font-medium hover:text-gray-900">
                {" "}
                تسجل الدخول{" "}
              </a>
              <div className="mr-4 inline">
                <PrimaryButton button="سجل معنا"  />
              </div>
            </div>
          </div>
      </header>
    </>
  );
};

export default Header;
