import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaYoutube,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    { name: "الرئيسية", href: '#' },
    { name: "المميزات", href: '#features' },
    { name: "خدماتنا", href: '#services' },
    { name: "تجربة النظام", href: '#pricing' },
    { name: "حساب تعريفي", href: '/userprofile' },
    { name: "اتصل بنا", href: '#try-us' },
  ];

  const socialIncons = [
    {
      name: 'YouTube',
      href: '#',
      icon: (
        <FaYoutube size={24} className="fill-gray-400 hover:fill-gray-900" />
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <FaGithub size={24} className="fill-gray-400 hover:fill-gray-900" />
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <FaTwitter size={24} className="fill-gray-400 hover:fill-gray-900" />
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <FaInstagram size={24} className="fill-gray-400 hover:fill-gray-900" />
      ),
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <FaFacebook size={24} className="fill-gray-400 hover:fill-gray-900" />
      ),
    },
  ];

  return (
    <footer className="relative w-full border-t">
      <Image
        src="/assets/images/beam-bg-top.png"
        width={92}
        height={33}
        className="w-full absolute rotate-180 -z-10 bottom-0"
        alt="img"
      />
      <div className="container flex flex-col mx-auto">
        <div className="flex flex-col items-center w-full my-20">
          <div className="grid grid-cols-2 align-middle items-center gap-20 my-8">
            <Link href="#">
            <Image
              src="/assets/logos/logo.svg"
              width={200} height={200}
              className=" cursor-pointer"
              alt="img"
            />
            </Link>
          <div className="mx-auto">
            <p className="text-gray-500 text-xl">مرخص و موثوق من</p>
            <Link href="#" className="flex justify-center mt-5">
            <Image src="/assets/images/tadawul.svg"
             width={170} height={170} className="cursor-pointer" alt="img" />
            </Link>
          </div>
          </div>
          <div className="flex flex-col items-center gap-6 mb-2">
            <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">
              {footerLinks.map((item, index) => {
                return (
                  <Link
                    href={item.href}
                    key={index}
                    className="font-semibold hover:text-gray-500"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-12 py-8 px-10">
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
            <p className="text-base font-semibold text-center">
              © جميع الحقوق محفوظة لمنصة سهمك{" "}
            </p>
            <p className="text-base font-semibold mt-3 text-center">
              سجل تجاري رقم 11234567890{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
