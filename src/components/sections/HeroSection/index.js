import PrimaryButton from "@/components/widgets/PrimaryButton";
import OutlineButton from "@/components/widgets/OutlineButton";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const HeroSection = () => {
  
  const handleOpenWhatsapp = () => {
    const encodedMessage = encodeURIComponent('مرحبًا! كيف يمكنني مساعدتك اليوم؟ 😃👋');
    window.open(`https://api.whatsapp.com/send/?phone=+923241045712&text=${encodedMessage}`, '_blank');
  }

  return (
    <>
      <div className="mt-20 lg:mt-36 lg:ml-16 w-full flex justify-center">
        <div className="lg:2/5 xl:w-2/3 text-center xs:mx-5 sm:mx-20">
        <div className="w-full text-center mb-10">
            <div className="bg-green-100/60 px-6 py-3 mx-auto inline-flex rounded-full">
                <span className="text-sm text-teal-800 font-small capitalize xl:text-center flex"> 
                <Image loading="eager"   src="/assets/icons/whatsapp.svg" width={20} height={20} className="ml-5" alt="img" priority /> 
                عن طريق الواتساب توصلك كل معلومات الأسهم
                </span>
            </div>
        </div>
          <div className="sm:text-6xl text-5xl font-semibold text-gray-900 leading-tight md:leading-none">
            <span>اتخذ قرارات مالية <br />أفضل مع</span>
            <span className=" relative sm:whitespace-nowrap text-teal-900/90 sm:inline hidden"> نظام سهمك الذكي
            <Image loading="eager"   
                src="/assets/icons/zline.svg"
                width={500}
                height={33}
                className="absolute flex top-14 left-0"
                alt="img"
                priority /></span>
                <span className="sm:hidden text-teal-900/90"> نظام </span>
                <span className=" relative whitespace-nowrap text-teal-900/90 sm:hidden inline"> سهمك الذكي 
            <Image loading="eager"   
                src="/assets/icons/zline.svg"
                width={500}
                height={33}
                className="absolute flex top-14 left-0"
                alt="img"
                priority /></span>
          </div>
          
          <div className="mb-8 mt-12 text-l text-gray-500/90 w-9/12 mx-auto antialiased">
          
            بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن
            الأسهم وسيعطيك إجابات دقيقة بإمكانك مع نظام سهمك الذكي الاستفسار
            بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة
          </div>
          <div className="flex gap-y-2 justify-center mt-4 gap-x-4">
            <div onClick={handleOpenWhatsapp}>
            <OutlineButton button="جرب الخدمة"  icon={<Image loading="eager"   src="/assets/icons/play-icon.svg" width={12} height={12} className="mr-5 whitespace-nowrap" alt="img" priority />}/>
            </div>
            <Link href="/auth/register">
            <PrimaryButton button="شهر مجانا" buttonStyle="py-2.5 shadow-lg" icon={<Image loading="eager"   src="/assets/icons/right-icon.svg" width={16} height={16} className="mr-5  whitespace-nowrap" alt="img" priority />}/>
            </Link>
          </div>
          <div className="mx-auto my-20">
            <p className="text-gray-500 text-xl">مرخص و موثوق من</p>
            <div className="flex justify-center mt-5">
            <Image loading="eager"   src="/assets/images/tadawul.svg" width={150} height={150} className="" alt="img" priority />
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default HeroSection;
