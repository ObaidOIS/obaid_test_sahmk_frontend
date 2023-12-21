import LoginCardForm from '@/components/sections/LoginCardForm';
import React from 'react';
import Image from 'next/image';

const Login = () => {
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
              <Image
                src="/assets/logos/logo.svg"
                width={140}
                height={60}
                className="cursor-pointer"
                alt="Logo"
              />
            </div>
          </div>
        </header>   
      <LoginCardForm />
    </div>
  )
}

export default Login
