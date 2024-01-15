"use client";
import LoginCardForm from '@/components/sections/LoginCardForm';
import React, {useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/components/common/utils";  

const Login = () => {
  
  const router = useRouter();
  
  useEffect(() => {
    const isAuthenticate = isAuthenticated(); 
    if (isAuthenticate) {
      router.push('/userprofile'); 
    }
  }, []);

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
          <div className="lg:container visible sm:invisible flex items-center justify-center pt-20 mx-auto">
            <div className="flex items-center">
              <Link href="/" >
              <Image
                src="/assets/logos/logo.svg"
                width={140}
                height={60}
                className="cursor-pointer"
                alt="Logo"
              />
              </Link>
            </div>
          </div>
        </header>   
      <LoginCardForm />
    </div>
  )
}

export default Login
