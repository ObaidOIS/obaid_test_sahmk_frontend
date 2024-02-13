"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import OrderSummaryForm from "@/components/sections/OrderSummaryForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/components/common/utils";

const OrderSummary = () => {
  // User can not see this page, until he is login
  const router = useRouter();
  useEffect(() => {
    const isAuth = isAuthenticated();
    isAuth || router.push("/auth/login");
  }, []);

  return (
    <div>
      <header className="w-full sm:ms-0 relative">
        <Image unoptimized={true}  loading="eager"  
          src="/assets/images/beam-2-bg.png"
          width={300}
          height={200}
          className="w-full absolute z-[-99999] top-0"
          alt="Background Image"
          priority
        />
        <div className="lg:container flex items-center sm:ps-0 ps-8 pt-20 mx-auto">
          <Link href="/" className="flex items-center">
            <Image unoptimized={true}  loading="eager"  
              src="/assets/logos/logo.svg"
              width={140}
              height={60}
              className="cursor-pointer"
              alt="Logo"
              priority
            />
          </Link>
        </div>
      </header>
      <div className="mt-20 sm:ms-0 ms-8 mb-14">
        <div className="text-3xl font-semibold mb-5 leading-none">
          إنشاء حساب في منصة سهمك
        </div>
        <p className="text-lg leading-7 ">
          ذا كنت تملك حساب{" "}
          <Link href="/auth/login" className=" text-primaryColor">
            سجل الدخول
          </Link>{" "}
          إلى حساب
        </p>
      </div>
      <div className="">
        <OrderSummaryForm />
      </div>
    </div>
  );
};

export default OrderSummary;
