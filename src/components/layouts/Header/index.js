"use client";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = ({ toggleSidebar }) => {
  const navLinks = [
    { name: "الرئيسية", link: "#features" },
    { name: "الخدمات", link: "#services" },
    { name: "اشتراكاتنا", link: "#pricing" },
    { name: "من نحن", link: "#try-us" },
    { name: "تواصل معنا", link: "#" },
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
          width={300}
          height={200}
          className="w-full absolute z-[-99999] top-0"
          alt="img"
        />
        <div className="lg:container flex items-center p-6 mx-auto flex-row">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logos/logo.svg"
              width={100}
              height={33}
              className=" cursor-pointer"
              alt="img"
            />
          </Link>
          <nav className="lg:flex hidden items-center justify-center text-base md:ml-auto mr-5">
            {navLinks.map((item, index) => {
              return (
                <Link
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
                </Link>
              );
            })}
          </nav>
          <div
            className="lg:hidden flex items-center flex-1 justify-end"
          >
            <div className="ml-4 inline">
              <Link href="/auth/register" >
                <PrimaryButton
                  button="سجل معنا"
                  buttonStyle="!py-2"
                />
              </Link>
            </div>
            <Bars3Icon className="h-10 w-10" onClick={() => toggleSidebar()} />
          </div>
          <div className="items-center h-full lg:flex hidden ">
            <a href="#_" className="hover:text-gray-900 font-normal">
              {" "}
              تسجل الدخول{" "}
            </a>
            <div className="mr-4 inline">
            <Link href="/auth/register" >
              <PrimaryButton button="سجل معنا" buttonStyle={`font-normal`} />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
