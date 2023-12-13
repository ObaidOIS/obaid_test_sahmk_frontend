import PrimaryButton from "@/components/widgets/PrimaryButton";
import OutlineButton from "@/components/widgets/OutlineButton";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="mt-20 lg:mt-36 lg:ml-16 w-full flex justify-center">
        <div className="lg:2/5 xl:w-2/3 text-center xs:mx-5 sm:mx-20">
        <div className="w-full text-center mb-10">
            <div className="bg-green-100/60 px-6 py-3 mx-auto inline-flex rounded-full">
                <span className="text-sm text-teal-800 font-bold capitalize xl:text-center flex"> 
                <Image src="/assets/icons/whatsapp.svg" width={20} height={20} className="ml-5" alt="img" /> 
                عن طريق الواتساب توصلك كل معلومات الأسهم
                </span>
            </div>
        </div>
          <div className="text-6xl font-semibold text-gray-900 leading-tight md:leading-none">
            <span>اتخذ قرارات مالية <br />أفضل مع</span>
            <span className=" text-teal-900/90"> نظام سهمك الذكي</span>
          </div>
          
          <div className="my-8 text-xl text-gray-500/90 w-9/12 mx-auto antialiased">
          <Image 
                src="/assets/images/zline.png"
                width={500}
                height={33}
                className="absolute md:flex hidden top-96 right-1/3"
                alt="img" />
            بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن
            الأسهم وسيعطيك إجابات دقيقة بإمكانك مع نظام سهمك الذكي الاستفسار
            بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة
          </div>
          <div className="sm:flex grid gap-y-2 justify-center mt-4 gap-x-4">
            <OutlineButton button="جرب الخدمة"  icon={<Image src="/assets/icons/play-icon.svg" width={12} height={12} className="mr-5" alt="img" />}/>
            <PrimaryButton button="شهر مجانا" buttonStyle="py-2.5 shadow-lg" icon={<Image src="/assets/icons/right-icon.svg" width={16} height={16} className="mr-5" alt="img" />}/>
          </div>
          <div className="mx-auto my-20">
            <p className="text-gray-500 text-xl">مرخص و موثوق من</p>
            <div className="flex justify-center mt-5">
            <Image src="/assets/images/tadawul.png" width={150} height={150} className="" alt="img" />
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default HeroSection;
