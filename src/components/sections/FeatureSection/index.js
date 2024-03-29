"use client";
import PrimaryCard from "@/components/widgets/PrimaryCard";
import TabSection from "@/components/widgets/TabSection";
import Image from "next/image";
import React, { useState } from "react";

const FeatureSection = () => {
  const Features = [
    {
      title: "استلام تنبيهات بأسعار الافتتاح والاغلاق",
      desc: "سيصلك من خلال أوقات الافتتاح والاغلاق  ، بيانات بأسعار الشركات المختارة في حسابك كما يمكنك التحكم بالبيانات ،إدارتها .",
      icon: (
        <Image unoptimized={true}  loading="eager"  
          src="/assets/icons/notification.svg"
          width={20}
          height={25}
          className="ml-5"
          alt="img"
          priority
        />
      ),
      image: "/assets/images/desktop.svg",
    },
    {
      title: "إدارة الأسعار المستهدفة",
      desc: "يمكنك من خلال إدارة حسابك إضافة الأسعار المستهدفة إلى حسابك ومعرفة التفاصيل .",
      icon: (
        <Image unoptimized={true}  loading="eager"  
          src="/assets/icons/hotspot.svg"
          width={25}
          height={25}
          className="ml-5"
          alt="img"
          priority
        />
      ),
      image: "/assets/images/chat-desktop.svg",
    },
    {
      title: "إستلام تقرير اسبوعي لحالة أسهمك والشركات.",
      desc: "سيصلك من خلال أوقات الافتتاح والاغلاق  ، بيانات بأسعار الشركات المختارة في حسابك كما يمكنك التحكم بالبيانات ،إدارتها .",
      icon: (
        <Image unoptimized={true}  loading="eager"  
          src="/assets/icons/notification.svg"
          width={20}
          height={25}
          className="ml-5"
          alt="img"
          priority
        />
      ),
      image: "/assets/images/desktop.svg",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <section
      id="features"
      className="relative h-full bg-gradient-to-tr 2xl:flex 2xl:justify-center from-teal-700 to-teal-500 via-teal-950 from-10% to-100% pt-20 pb-20"
    >
      <div className="mx-auto h-[820px] sm:h-[1000px] md:h-[1100px] lg:h-[810px] xl:h-[785px] 2xl:overflow-visible overflow-hidden relative">
        <div className="max-w-2xl mx-auto text-center xl:max-w-none">
          <div className="text-2xl font-semibold text-white mb-5 px-8 leading-none">
            كل بيانات الأسهم أصبحت أسرع وأقرب إليك
          </div>
          <p className=" font-small text-gray-300 ">
            بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن
            الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة{" "}
          </p>
        </div>
        <div className="mt-16 relative grid grid-cols-1 mx-auto items-center gap-y-2 pt-10 sm:gap-y-6 lg:grid-cols-12 lg:pt-0">
          <div className="">
          <div className="-mx-4 absolute lg:w-[500px] lg:top-8 lg:right-[700px] lg:overflow-x-auto pb-4 sm:mx-0 overflow-visible sm:pb-0 lg:col-span-5">
            <div className="relative z-10 flex space-y-0 px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block ">
              <div className="lg:hidden flex justify-center mx-auto w-screen lg:mt-20 ">
                <div className="flex items-center md:!w-[750px] overflow-x-scroll justify-center bg-white/10 sm:rounded-t-xl">
                  <ul className="mx-auto flex w-full gap-6 relative px-4 py-4 overflow-x-scroll">
                    {Features.map((item, index) => {
                      return (
                        <li className="" key={index}>
                          <TabSection
                            title={item.title}
                            index={index}
                            desc={item.desc}
                            handleTabClick={handleTabClick}
                            activeTab={activeTab}
                          />
                        </li>
                      );
                    })}
                  </ul>

                  {Features.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`absolute lg:top-[8.7rem] top-[3.8rem] text-center md:!w-[750px] text-white inset-0 transition-all mx-auto duration-500 ease-in-out ${
                          index == activeTab
                            ? "visible opacity-100"
                            : "opacity-0 invisible"
                        }`}
                      >
                        <div className="bg-white/10 px-8 rounded-b-xl p-5 h-36 my-3 text-right ">
                          {item.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {Features.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      onClick={() => handleTabClick(index)}
                      className={`${
                        activeTab === index
                          ? "bg-white/10 ring-1 ring-inset ring-white/20"
                          : ""
                      } lg:pe-2 w-full lg:w-2/3 xl:w-full hidden lg:block hover:bg-white/10 cursor-pointer group relative rounded-full xl:ps-20 ps-3 xl:pe-14 rounded-l-xl rounded-r-none py-8`}
                    >
                      <PrimaryCard
                        index={index}
                        title={item.title}
                        desc={item.desc}
                        icon={item.icon}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {Features.map((item, index) => {
            return activeTab === index ? (
              <div key={index} className="lg:col-span-7 hidden lg:flex">
                <Image unoptimized={true}  loading="eager"  
                  src={item.image}
                  width={700}
                  height={800}
                  className="absolute 2xl:rounded-3xl xl:right-0 right-[-30] top-[0px]"
                  alt="img"
                  priority
                />
              </div>
            ) : (
              ""
            );
          })}
          {Features.map((item, index) => {
            return activeTab === index ? (
              <div
                key={index}
                className="col-span-12 z-30 lg:hidden flex justify-center"
              >
                <Image unoptimized={true}  loading="eager"  
                  src={item.image}
                  width={750}
                  height={800}
                  className="absolute top-64 sm:top-56 w-11/12"
                  alt="img"
                  priority
                />
              </div>
            ) : (
              ""
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
