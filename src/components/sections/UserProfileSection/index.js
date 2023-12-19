"use client";
import React, { useState, useEffect } from "react";
import ArrowList from "@/components/widgets/ArrowList";
import SimpleLineChart from "@/components/widgets/SimpleLineChart";
import Image from "next/image";
import MainBadge from "@/components/widgets/MainBadge";
import ProfileFooter from "@/components/sections/ProfileFooter";
import MainSidebar from "@/components/widgets/MainSidebar";
import DarkNavOverlay from "../DarkNavOverlay";
import Stats from "@/components/widgets/Stats";
import IconSwitch from "@/components/widgets/IconSwitch";
import PricingAddPanel from "@/components/widgets/PricingAddPanel";
import ModalUI from "@/components/widgets/ModalUI";
import PopupModal from "@/components/widgets/PopupModal";

const UserProfileSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  let [page, setPage] = useState({
      name: "userprofile",
      value: "الخدمات الرئىيسية",
    }
  );

  // let [page, setPage] = useState({ name: "target-prices", value: "الأسعار المستهدفة للأسهم" });
 
  useEffect(() => {
    setPage(JSON.parse(localStorage.getItem("page")));
  }, [])

  useEffect(() => {
    const cleanPage = cleanCircularReferences(page); // Implement a function to remove circular references
    const serializedPage = JSON.stringify(cleanPage);
    localStorage.setItem("page", serializedPage);
  }, [page]);

  function cleanCircularReferences(obj) {
    const seen = new WeakSet();
    return JSON.parse(
      JSON.stringify(obj, (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return undefined; // Exclude circular references
          }
          seen.add(value);
        }
        return value;
      })
    );
  }

  const [isNotificationChecked, setIsNotificationChecked] = useState(false);

  const handleNotificationSwitch = () => {
    setIsNotificationChecked((prevChecked) => !prevChecked);
  };

  const [isTvChecked, setIsTvChecked] = useState(false);

  const handleTvSwitch = () => {
    setIsTvChecked((prevChecked) => !prevChecked);
  };

  const list = [
    {
      title: "خدمة إشعارات الأسهم",
      desc: "يمكنك التحكم بإشعارات الواتساب وإدارتها",
      icon: (
        <Image
          src="/assets/icons/message-glow-icon.svg"
          width={85}
          height={85}
          alt="img"
        />
      ),
      page: { name: "stock-notification", value: "خدمة إشعارات الأسهم" },
    },
    {
      title: " الأسعار المستهدفة للأسهم",
      desc: "يمكنك التحكم بإشعارات الواتساب وإدارتها",
      icon: (
        <Image
          src="/assets/icons/point-glow-icon.svg"
          width={85}
          height={85}
          alt="img"
        />
      ),
      page: { name: "target-prices", value: "الأسعار المستهدفة للأسهم" },
    },
    {
      title: "تقارير أسهمي الاسبوعية",
      desc: "مشاهدة التقرير الاسبوعي لأسهمي",
      icon: (
        <Image
          src="/assets/icons/progress-glow-icon.svg"
          width={85}
          height={85}
          alt="img"
        />
      ),
      page: { name: "weekly-stock", value: "تقارير أسهمي الاسبوعية" },
    },
    {
      title: "باقتي وحسابي",
      desc: "تفاصيل باقتك والحساب الخاص بك",
      icon: (
        <Image
          src="/assets/icons/profile-glow-icon.svg"
          width={85}
          height={85}
          alt="img"
        />
      ),
      page: { name: "my-account", value: "باقتي وحسابي" },
    },
  ];

  const stats = [
    { id: 1, name: "السعر", value: "11,676.34" },
    { id: 2, name: "نسبة التغيير", value: "0.65 ٪" },
    { id: 3, name: "عدد الصفقات", value: "427,27" },
    { id: 4, name: "الكمية المتداولة", value: "260,537,940" },
    { id: 5, name: "القيمة المتداولة", value: "6,417,954,300" },
  ];

  const tagsList = [
    { id: 1, name: "مؤشر السوق", active: true },
    { id: 2, name: "شركة علم", active: false },
    { id: 3, name: "شركة علم", active: false },
    { id: 4, name: "شركة علم", active: false },
    { id: 5, name: "شركة علم", active: false },
    { id: 4, name: "شركة علم", active: false },
    { id: 5, name: "شركة علم", active: false },
  ];

  const chartTagsList = [
    { id: 1, name: "أسبوع", active: true },
    { id: 2, name: "شهر", active: false },
    { id: 3, name: "3 أشهر", active: false },
  ];

  const [isPricingAddPanelOpen, setIsPricingAddPanelOpen] = useState(false);

  const handleFeedClick = () => {
    setIsPricingAddPanelOpen(!isPricingAddPanelOpen);
  };

  const dataList = [
    {name: 'الاتصالات السعودية', selected: false},
    {name: 'شركة علم', selected: false},
    {name: 'مصرف الانماء', selected: true},
    {name: 'الجزيرة', selected: true},
    {name: 'الاتصالات المتكاملة', selected: false},
    {name: 'الرياض', selected: false},
    {name: 'سابك', selected: false},
  ]
  const [openSucessModal, setOpenSucessModal] = useState(false)

  return (
    <div>
      {openSucessModal ? <PopupModal
      onClickHandle={()=>{ setIsPricingAddPanelOpen(false); setOpenSucessModal(true);}}
      onClose={() => setIsPricingAddPanelOpen(false)} 
      image={<Image
        src="/assets/icons/success-new-icon.svg"
        width={400}
        height={400}
        alt="img"
        className=""
      />}
      title="تم إضافة أسهمك بنجاح"
      desc="ستصلك يوميا أسعار الافتتاج والاغلاق"
       /> : ""}
      {isPricingAddPanelOpen ? <ModalUI 
      onClickHandle={()=>setOpenSucessModal(true)}
      onClose={() => setIsPricingAddPanelOpen(false)} 
      dataList={dataList}
      title="إضافة تعديل أسهمي"
      button="حفظ"
       /> : ""}
      <DarkNavOverlay
        page={page}
        setPage={setPage}
        toggleSidebar={toggleSidebar}
      >
        <MainSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          list={list}
        />
        {page.name == "userprofile" ? (
          <div className="space-y-6 translation duration-500 ease-in-out">
            <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
              {list.map((item, index) => {
                return (
                  <div key={index} onClick={() => setPage(item.page)}>
                    <ArrowList
                      leftIcon={
                        <Image
                          src="/assets/icons/arrow-right.svg"
                          width={8}
                          height={8}
                          alt="img"
                          className="group-hover:opacity-100 opacity-20 me-4"
                        />
                      }
                      title={item.title}
                      desc={item.desc}
                      icon={item.icon}
                      bgColor={item.bgColor}
                    />
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-[#F5F7F9] pt-4 px-4 rounded-3xl space-y-4 border border-gray-300">
              <div className="flex items-end mb-5">
                <div className="text-2xl font-medium leading-none m-2">
                  {" "}
                  مؤشر السوق{" "}
                </div>
                <MainBadge
                  title="الأسعار متأخرة"
                  badgeStyle="bg-amber-100 text-amber-500 px-4 py-1"
                />
              </div>
              <div className="space-x-3 flex overflow-x-auto pt-2 pb-6 ">
                {tagsList.map((item, index) => {
                  return (
                    <span key={index}>
                    <MainBadge
                      title={item.name}
                      index={index}
                      badgeStyle={`${
                        item.active == true
                          ? "bg-darkColor text-whiteColor"
                          : "bg-gray-200/80 text-darkColor"
                      } truncate px-4 justify-center py-1.5 ml-3 min-w-[80px] block`}
                    />
                    </span>
                  );
                })}
              </div>
              <div>
                <Stats stats={stats} />
              </div>
              <div>
                <div className="font-medium text-left leading-none m-2 mt-5">
                  تحديث البيانات{" "}
                  <span className="font-normal text-gray-500/80">
                    اليوم الساعة 2:00
                  </span>
                </div>
              </div>
              <div className="mt-0 mb-16 pb-4 pt-2">
                <div className="bg-whiteColor py-3 pe-2 shadow-lg border rounded-xl ">
                  <div className="my-5 ps-5">
                    {chartTagsList.map((item, index) => {
                      return (
                        <span key={index}>
                        <MainBadge
                          title={item.name}
                          index={index}
                          badgeStyle={`${
                            item.active == true
                              ? "bg-darkColor text-whiteColor"
                              : "bg-gray-200/80 text-darkColor"
                          } truncate px-4 justify-center py-1.5 ml-3 block`}
                        />
                        </span>
                      );
                    })}
                  </div>
                  <SimpleLineChart />
                </div>
              </div>
            </div>
          </div>
        ) : page.name == "stock-notification" ? (
          <div className="space-y-6">
            <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
              <div className="space-y-4">
                <ArrowList
                  leftIcon={
                    <IconSwitch
                      handleSwitch={handleNotificationSwitch}
                      isChecked={isNotificationChecked}
                    />
                  }
                  cardStyle="p-5"
                  title=" استقبال أسعار الافتتاح والإغلاق  للشركات"
                  desc="تصلك على الواتساب رسائل بسعر الافتتاح والاغلاق يوميا"
                  icon={
                    <Image
                      src="/assets/icons/green-bell-icon.svg"
                      width={25}
                      height={25}
                      alt="img"
                      className="ml-5"
                    />
                  }
                  isChecked={isNotificationChecked}
                  addPanel={<PricingAddPanel handleFeedClick={handleFeedClick} />}
                />
                <ArrowList
                  leftIcon={
                    <IconSwitch
                      handleSwitch={handleTvSwitch}
                      isChecked={isTvChecked}
                    />
                  }
                  cardStyle="p-5"
                  title=" استلام ملخص السوق"
                  desc="رسائل ملخص السوق العام"
                  icon={
                    <Image
                      src="/assets/icons/tv-icon.svg"
                      width={25}
                      height={25}
                      alt="img"
                      className="ml-5"
                      isChecked={isTvChecked}
                    />
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          (page.name = "target-prices" ? (
            <div className="space-y-6">
              <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                <p>Second tab</p>
              </div>
            </div>
          ) : (
            (page.name = "weekly-stock" ? (
              <div className="space-y-6">
                <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                  <p>Third tab</p>
                </div>
              </div>
            ) : (
              (page.name = "my-account" ? (
                <div className="space-y-6">
                  <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                    <p>Fourth tab</p>
                  </div>
                </div>
              ) : (
                ""
              ))
            ))
          ))
        )}
      </DarkNavOverlay>
      <div>
        <ProfileFooter />
      </div>
    </div>
  );
};

export default UserProfileSection;
