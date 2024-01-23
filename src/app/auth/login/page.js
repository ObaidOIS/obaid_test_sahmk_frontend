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
      <LoginCardForm />
    </div>
  )
}

export default Login
