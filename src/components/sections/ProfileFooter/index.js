import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa6";
import Loader from "@/components/widgets/Loader";

const ProfileFooter = ({name}) => {
  const footerLinks = [
    { name: "الرئيسية", href: '/#' },
    { name: "المميزات", href: '/#features' },
    { name: "خدماتنا", href: '/#services' },
    { name: "تجربة النظام", href: '#' },
    { name: "صفحة الخصوصية", href: '/privacypolicy#' },
    { name: "حساب تعريفي", href: '/userprofile' },
    { name: "تواصل معنا", href: '/contactus#' },
  ];

  
  const handleOpenWhatsapp = () => {
    const encodedMessage = encodeURIComponent('عطني سعر الحبيب');
    window.open(`https://api.whatsapp.com/send/?phone=+966591254924&text=${encodedMessage}`, '_blank');
  }

  const socialIncons = [
    {
      name: "Twitter",
      href: "https://twitter.com/sahmk_sa",
      icon: (
        <FaTwitter size={24} className="fill-gray-400 hover:fill-gray-900" />
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/sahmk_sa/",
      icon: (
        <FaInstagram size={24} className="fill-gray-400 hover:fill-gray-900" />
      ),
    },
  ];

  return (
    <>
    {name !== "" &&
      (
    <footer className="w-full border-t shadow-2xl transition duration-300">
      <div className="container flex flex-col mx-auto">
        <div className="flex flex-col items-center w-full my-20">
          <Link href="/" className="mt-8 mb-14">
            <Image loading="eager"  
              src="/assets/logos/logo.svg"
              width={100}
              height={100}           
              alt="img"
              priority
            />
          </Link>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-20 gap-y-3 lg:flex-nowrap text-dark-grey-900">
              {footerLinks.map((item, index) => {
                return (
                  item.name == "تجربة النظام" ? 
                  <div 
                  key={index}
                  onClick={handleOpenWhatsapp}
                  className="text-sm cursor-pointer leading-6 text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </div> : 
                  <a
                    href={item.href}
                    key={index}
                    className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    // onClick={(e)=>{if(item.href == "/userprofile" && localStorage.getItem('page')){localStorage.removeItem('page')}}}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
            <div className="flex items-center gap-12 pt-6 pb-8 px-10">
              {socialIncons.map((item, index) => {
                return (
                  <Link href={item.href} key={index}>
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
    </footer>)}
    </>
  );
};

export default ProfileFooter;
