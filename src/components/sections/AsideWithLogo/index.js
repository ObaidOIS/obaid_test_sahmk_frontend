"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const AsideWithLogo = () => {
  const pathname = usePathname();

  return (
    <div className="relative flex-1">
      <Image unoptimized={true}  loading="eager"  
        src="/assets/images/dark-rectangle.png"
        width={300}
        height={200}
        className={`z-20 h-full w-[calc(100%-0.75rem)] ms-3`}
        objectFit="cover"
        alt="image"
        priority
      />
      <Image loading="eager"  
        src="/assets/images/gradient-rectangle.png"
        layout="fill"
        className="z-[-9999]"
        objectFit="cover"
        alt="image"
        priority
      />
      <div className="absolute top-0 w-full">
        <div className="relative">
          <Image unoptimized={true}  loading="eager"  
            src="/assets/images/layer-design.png"
            className="absolute top-8 right-0 w-full"
            width={800}
            height={800}
            alt="image"
            priority
          />
        </div>
        <div className="grid grid-cols-1 mt-32 ml-24">
          <div className="ms-auto text-center z-50">
            <Link href="/" className="w-full flex justify-center">
            <Image unoptimized={true}  loading="eager"  
              src="/assets/logos/logo-accent.svg"
              height={150}
              width={150}
              alt="image"
              className="cursor-pointer"
              priority
            />
            </Link>
            <div className="w-60 mt-40">
              <p className="text-white text-2xl  w-full">
                وصولك لأسعار الأسهم أصبح أسرع مع سهمك
              </p>
            </div>
            <div className="w-60 mt-72">
              <h5 className="text-gray-400/70">مرخص من تداول السعودية</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsideWithLogo;
