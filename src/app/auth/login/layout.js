import Image from "next/image";
import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <div className="mx-auto gap-5 h-screen bg-darkNavyColor ">
      <div className="relative bg-darkNavyColor z-[20]">
          <Image
            src="/assets/images/login-layer-design.svg"
            layout="fill"
            className=" w-screen absolute top-0 bottom-0 left-0 right-0"
            alt="Background Image"
            priority
          />
          <header className="w-full relative py-20">
          {children}
          </header>
      </div>
    </div>
  );
};

export default LoginLayout;
