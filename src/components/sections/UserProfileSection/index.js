"use client";
import React, { useState } from "react";
import ArrowList from "@/components/widgets/ArrowList";
import BasicHeading from "@/components/widgets/BasicHeading";
import SimpleLineChart from "@/components/widgets/SimpleLineChart";
import Image from "next/image";
import MainBadge from "@/components/widgets/MainBadge";
import ProfileFooter from "@/components/sections/ProfileFooter";
import { IoMdMenu } from "react-icons/io";
import MainSidebar from "@/components/widgets/MainSidebar";

const UserProfileSection = () => {
    

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const list = [
    {
      title: "إدارة إشعارات الأسهم والشركات",
      desc: "يمكنك التحكم بإشعارات الواتساب وإدارتها",
      icon: (
        <Image
          src="/assets/icons/white-notification.svg"
          width={20}
          height={20}
          alt="img"
        />
      ),
      bgColor: "md:bg-teal-500 bg-[#14B38F] ",
    },
    {
      title: "إدارة الأسهم المستهدفة",
      desc: "يمكنك التحكم بإشعارات الواتساب وإدارتها",
      icon: (
        <Image
          src="/assets/icons/white-hotspot.svg"
          width={25}
          height={25}
          alt="img"
        />
      ),
      bgColor: "md:bg-teal-900  bg-[#0D9B9E]",
    },
    {
      title: "تقارير أسهمي الاسبوعية",
      desc: "مشاهدة التقرير الاسبوعي لأسهمي",
      icon: (
        <Image
          src="/assets/icons/white-progress-icon.svg"
          width={25}
          height={25}
          alt="img"
        />
      ),
      bgColor: "md:bg-purple-500  bg-[#0789A9]",
    },
    {
      title: "باقتي وحسابي",
      desc: "تفاصيل باقتك والحساب الخاص بك",
      icon: (
        <Image
          src="/assets/icons/white-profile-icon.svg"
          width={25}
          height={25}
          alt="img"
        />
      ),
      bgColor: "md:bg-amber-500  bg-[#0177B4]",
    },
  ];

  return (
    <div>
        <MainSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} list={list} />
      <header className="w-full relative">
        <div className="flex p-6">
          <div
            className="lg:hidden flex flex-1 justify-start "
            onClick={() => toggleSidebar()}
          >
            <IoMdMenu size={24} />
          </div>
          <div className="lg:hidden flex flex-1 justify-end ">
            <p className=" font-semibold ml-7">EN</p>
            <Image
              src="/assets/icons/logout.svg"
              width={24}
              height={24}
              alt="Image"
            />
          </div>
        </div>
        <Image
          src="/assets/images/beam-2-bg.png"
          width={300}
          height={200}
          className="w-full absolute z-[-99999] top-0"
          alt="Background Image"
        />
        <div className="lg:container flex items-center pt-8 justify-center mx-auto">
          <a className="flex items-center">
            <Image
              src="/assets/logos/logo.png"
              width={150}
              height={90}
              className="cursor-pointer"
              alt="Logo"
            />
          </a>
        </div>
      </header>

      <div className="container lg:w-3/6 px-5 md:mx-auto">
        <BasicHeading
          styling="!mt-9"
          heading="مرحبا بك في نظام سهمك"
          desc="يمكنك إدارة حسابك والاطلاع على تفاصيل الاسهم وباقتك"
        />
        <div className="text-2xl font-semibold mb-5 mt-20 leading-none">
          الخدمات الرئىيسية
        </div>
        <div className="w-full">
          {list.map((item, index) => {
            return (
              <div key={index}>
                <ArrowList
                  title={item.title}
                  desc={item.desc}
                  icon={item.icon}
                  bgColor={item.bgColor}
                />
              </div>
            );
          })}
        </div>
        <div className="shadow-lg border rounded-xl mt-16 mb-16 py-4 border-b">
          <div className="flex items-center mb-5">
            <div className="text-xl font-semibold leading-none m-4">
              {" "}
              المؤشر اليوم{" "}
            </div>
            <MainBadge
              title="الأسعار متأخرة"
              badgeStyle="bg-amber-100 text-amber-500 "
            />
          </div>
          <SimpleLineChart />
        </div>
      </div>
      <div>
        <ProfileFooter />
      </div>
    </div>
  );
};

export default UserProfileSection;
