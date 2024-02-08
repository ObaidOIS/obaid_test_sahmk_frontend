import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    { name: "الرئيسية", href: '/#' },
    { name: "المميزات", href: '/#features' },
    // { name: "خدماتنا", href: '/#services' },
    { name: "خدماتنا", href: '/#services' },
    { name: "تجربة النظام", href: '#' },
    { name: "صفحة الخصوصية", href: '/privacypolicy#' },
    { name: "حساب تعريفي", href: '/userprofile' },
    { name: "تواصل معنا", href: '/contactus#' },
  ];

  
  const handleOpenWhatsapp = () => {
    const encodedMessage = encodeURIComponent('مرحبًا! كيف يمكنني مساعدتك اليوم؟ 😃👋');
    window.open(`https://api.whatsapp.com/send/?phone=+966591254924&text=${encodedMessage}`, '_blank');
  }

  const socialIncons = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/sahmk_sa',
      icon: (
        <FaTwitter size={24} className="fill-gray-400 hover:fill-gray-900" />
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sahmk_sa/',
      icon: (
        <FaInstagram size={24} className="fill-gray-400 hover:fill-gray-900" />
      ),
    },
  ];

  return (
    <footer className="relative w-full border-t">
      <Image loading="eager"  
        src="/assets/images/beam-bg-top.png"
        width={92}
        height={33} 
        className="w-full absolute rotate-180 -z-10 bottom-0"
        alt="img"
        priority
      />
      <div className="container flex flex-col mx-auto">
        <div className="flex flex-col items-center w-full my-20">
          <div className="sm:grid sm:grid-cols-2 flex align-middle items-center sm:gap-20 gap-8 px-3 my-8">
            <Link href="/#">
            <Image loading="eager"  
              src="/assets/logos/logo.svg"
              width={100}
              height={100} 
              className=" cursor-pointer"
              alt="img"
              priority
            />
            </Link>
          <div className="mx-auto">
            <p className="text-gray-500 sm:text-xl">مرخص و موثوق من</p>
            <Link href="#" className="flex justify-center mt-5">
            <Image loading="eager"   src="/assets/images/tadawul.svg"
             width={100}
             height={100}  
             className="cursor-pointer" alt="img"
             priority />
            </Link>
          </div>
          </div>
          <div className="flex flex-col items-center gap-6 mb-2">
            <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">
              {footerLinks.map((item, index) => {
                return (
                  item.name == "تجربة النظام" ? 
                  <div 
                  key={index}
                  onClick={handleOpenWhatsapp}
                  className="text-sm cursor-pointer leading-6 text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </div> : <a
                  href={item.href}
                  key={index}
                  onClick={(e)=>{if(item.href == "/userprofile" && localStorage.getItem('page')){localStorage.removeItem('page')}}}
                  className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                >
                  {item.name}
                </a>
                );
              })}
            </div>
            <div className="flex items-center sm:gap-12 gap-8 py-8 sm:px-10 px-3">
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
            <p className="mt-1 text-center text-sm leading-6 text-slate-500">
              سجل تجاري رقم 11234567890{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
