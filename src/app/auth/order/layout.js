import React from 'react';
import Image from "next/image";
import Link from "next/link";
import AsideWithLogo from "@/components/sections/AsideWithLogo";

const AuthLayout = ({children}) => {

  return (
    <div className="mx-auto gap-5">
    <div className="grid grid-cols-1 lg:grid-cols-12 ">
      <div className="col-span-7 sm:mx-8">
        {children}
      </div>
      {/* <div className="col-span-5 relative lg:px-0 justify-center "> */}
      <div className="col-span-5 hidden relative lg:flex lg:px-0 justify-center items-stretch">
        <AsideWithLogo />
      </div>
    </div>
  </div>
  )
}

export default AuthLayout
