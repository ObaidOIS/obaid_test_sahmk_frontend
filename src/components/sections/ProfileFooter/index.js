import React from "react";
import Image from "next/image";
import Link from "next/link";
import {FaTwitter} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa6";


const ProfileFooter = () => {
    
  const footerLinks = [
    { name: "الرئيسية" },
    { name: "المميزات" },
    { name: "خدماتنا" },
    { name: "تجربة النظام" },
  ];

  const socialIncons = [
    {
      icon: (
        <IoLogoWhatsapp size={24} className="fill-gray-300 hover:fill-gray-900" />
      ),
    },
    {
      icon: (
        <FaTwitter size={24} className="fill-gray-300 hover:fill-gray-900" />
      ),
    },
    {
      icon: (
        <FaEnvelope size={24} className="fill-gray-300 hover:fill-gray-900" />
      ),
    }
  ];

  return (
    <footer className="w-full border-t shadow-2xl transition duration-300">
      <div className="container flex flex-col mx-auto">
        <div className="flex flex-col items-center w-full my-20">
          <Link href="/" className="mt-8 mb-14">
            <Image
              src="/assets/logos/logo.svg"
              width={100} height={100}
              alt="img"
            />
          </Link>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-20 gap-y-3 lg:flex-nowrap text-dark-grey-900">
              {footerLinks.map((item, index) => {
                return (
                  <Link
                    href="#_"
                    key={index}
                    className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-12 pt-6 pb-8 px-10">
              {socialIncons.map((item, index) => {
                return (
                  <Link href="#_" key={index}>
                    {item.icon}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="">
            <p className="mt-1 text-center text-sm leading-6 text-slate-500">
              © جميع الحقوق محفوظة لمنصة سهمك{" "}
            </p>
            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              سجل تجاري رقم 11234567890{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ProfileFooter
