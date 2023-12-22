import React from "react";
import Link from "next/link";
import OrderSummaryForm from "@/components/sections/OrderSummaryForm";
import Image from "next/image";

const OrderSummary = () => {
  return (
    <div>
    <header className="w-full sm:ms-0 relative">
          <Image
            src="/assets/images/beam-2-bg.png"
            width={300}
            height={200}
            className="w-full absolute z-[-99999] top-0"
            alt="Background Image"
          />
          <div className="lg:container flex items-center sm:ps-0 ps-8 pt-20 mx-auto">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logos/logo.svg"
                width={140}
                height={60}
                className="cursor-pointer"
                alt="Logo"
              />
            </Link>
          </div>
        </header>    
    <div className="mt-20 sm:ms-0 ms-8 mb-14">
      <div className="text-3xl font-semibold mb-5 leading-none">
      إنشاء حساب في منصة سهمك 
    </div>
    <p className="text-lg leading-7 ">
    ذا كنت تملك حساب <Link href="/auth/login" className=" text-teal-500">سجل الدخول</Link> إلى حساب 
    </p>
      </div>
      <div className="">
      <OrderSummaryForm />
      </div>
  </div>
  )
}

export default OrderSummary
