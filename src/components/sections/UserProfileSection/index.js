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
import UserProfileFeatureOne from "../UserProfileFeatureOne";
import UserProfileFeatureTwo from "../UserProfileFeatureTwo";
import UserProfileFeatureFour from "../UserProfileFeatureFour";
import OrderSummaryForm from "../OrderSummaryForm";
import UserProfileFeatureThree from "../UserProfileFeatureThree";
import apiCall from "@/components/common/api";
import { extractCountryCodeFromPhoneNumber } from "@/components/common/utils";

const UserProfileSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationChecked, setIsNotificationChecked] = useState(false);
  const [isTvChecked, setIsTvChecked] = useState(false);
  const [isPricesChecked, setIsPricesChecked] = useState(false);
  const [isSecondFeatureModalOpen, setIsSecondFeatureModalOpen] =
    useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [deactivateAlert, setDeactivateAlert] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    countryCode: "+966",
    expirationDate: null,
  });
  const [firstType, setFirstType] = useState(null);
  const [originalSubscriptionDetails, setOriginalSubscriptionDetails] =
    useState({ subscriptionType: "free", subscriptionPeriod: "monthly" });

  useEffect(() => {
    // This effect runs once on component mount to fetch the user data
    const fetchUserData = async () => {
      const response = await apiCall("/auth/api/user/");
      const data = response.result;
      if (data) {
        const { countryCode, phoneNumber } = extractCountryCodeFromPhoneNumber(
          data.phoneNumber
        );
        setUserData({
          name: data.fullName || "",
          phoneNumber: phoneNumber || "",
          email: data.email || "",
          countryCode: countryCode,
          expirationDate: data.expirationDate || null,
        });
        setOriginalSubscriptionDetails({
          subscriptionType: data.subscriptionType || "free",
          subscriptionPeriod: data.subscriptionPeriod || "monthly",
        });
        setFirstType(data.subscriptionType);
      }
    };

    fetchUserData();
  }, []);

  // let [page, setPage] = useState({
  //   name: "userprofile",
  //   value: "الخدمات الرئىيسية",
  // });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const storedPage =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("page"));

  let [page, setPage] = useState(
    storedPage || {
      name: "userprofile",
      value: "الخدمات الرئىيسية",
    }
  );

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && storedPage && page !== storedPage) {
  //     setPage(storedPage);
  // }
  // }, [storedPage]);

  useEffect(() => {
    const cleanPage = cleanCircularReferences(page);
    console.log(cleanPage); // Implement a function to remove circular references
    const serializedPage = JSON.stringify(cleanPage);
    // localStorage.setItem("page", serializedPage);
    localStorage.setItem("page", serializedPage);
  }, [page]);

  function cleanCircularReferences(obj) {
    const seen = new WeakSet();
    return JSON.parse(
      JSON.stringify(obj, (key, value) => {
        // Skip React components
        if (React.isValidElement(value)) {
          return undefined;
        }

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

  const handleNotificationSwitch = () => {
    setIsNotificationChecked((prevChecked) => !prevChecked);
    isNotificationChecked == false
      ? setSuccessAlert(true)
      : setDeactivateAlert(true);
  };

  const handleTvSwitch = () => {
    setIsTvChecked((prevChecked) => !prevChecked);
    isTvChecked == false ? setSuccessAlert(true) : setDeactivateAlert(true);
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

  const [activeStat, setActiveStat] = useState("0");

  const tagsList = [
    {
      id: 1,
      name: "مؤشر السوق",
      stats: [
        { id: 1, name: "السعر", value: "11,676.34" },
        { id: 2, name: "نسبة التغيير", value: "0.65 ٪" },
        { id: 3, name: "عدد الصفقات", value: "427,27" },
        { id: 4, name: "الكمية المتداولة", value: "260,537,940" },
        { id: 5, name: "القيمة المتداولة", value: "6,417,954,300" },
      ],
    },
    {
      id: 2,
      name: "شركة علم",
      stats: [
        { id: 1, name: "السعر", value: "676.30" },
        { id: 2, name: "نسبة التغيير", value: "0.75 ٪" },
        { id: 3, name: "عدد الصفقات", value: "292,76" },
        { id: 4, name: "الكمية المتداولة", value: "960,940" },
        { id: 5, name: "القيمة المتداولة", value: "7,954,300" },
      ],
    },
    {
      id: 3,
      name: "شركة علم",
      stats: [
        { id: 1, name: "السعر", value: "1,676" },
        { id: 2, name: "نسبة التغيير", value: "30 ٪" },
        { id: 3, name: "عدد الصفقات", value: "8827,27" },
        { id: 4, name: "الكمية المتداولة", value: "390,537,940" },
        { id: 5, name: "القيمة المتداولة", value: "954,300" },
      ],
    },
    {
      id: 4,
      name: "شركة علم",
      stats: [
        { id: 1, name: "السعر", value: "18,676.34" },
        { id: 2, name: "نسبة التغيير", value: "2.64 ٪" },
        { id: 3, name: "عدد الصفقات", value: "903277" },
        { id: 4, name: "الكمية المتداولة", value: "232,360,940" },
        { id: 5, name: "القيمة المتداولة", value: "417,954,300" },
      ],
    },
    {
      id: 5,
      name: "شركة علم",
      stats: [
        { id: 1, name: "السعر", value: "11.34" },
        { id: 2, name: "نسبة التغيير", value: "0.5 ٪" },
        { id: 3, name: "عدد الصفقات", value: "327,27" },
        { id: 4, name: "الكمية المتداولة", value: "260,940" },
        { id: 5, name: "القيمة المتداولة", value: "6,417,300" },
      ],
    },
    {
      id: 6,
      name: "شركة علم",
      stats: [
        { id: 1, name: "السعر", value: "123.34" },
        { id: 2, name: "نسبة التغيير", value: "23 ٪" },
        { id: 3, name: "عدد الصفقات", value: "9327,27" },
        { id: 4, name: "الكمية المتداولة", value: "2,933,537,940" },
        { id: 5, name: "القيمة المتداولة", value: "20,417,954,300" },
      ],
    },
  ];

  const [activeChartTag, setActiveChartTag] = useState("أسبوع");

  const chartTagsList = [
    {
      id: 1,
      name: "أسبوع",
      data: [
        { name: "الاحد", uv: 40, pv: 2400, amt: 2400 },
        { name: "السبت", uv: 55, pv: 2400, amt: 2400 },
        { name: "الجمعة", uv: 55, pv: 2400, amt: 2400 },
        { name: "الخميس", uv: 35, pv: 2400, amt: 2400 },
        { name: "الاربعاء", uv: 10, pv: 2400, amt: 2400 },
        { name: "الثلاثاء", uv: 20, pv: 2400, amt: 2400 },
        { name: "الاثنين", uv: 15, pv: 2400, amt: 2400 },
        { name: "الاحد", uv: 25, pv: 2400, amt: 2400 },
      ],
    },
    {
      id: 2,
      name: "شهر",
      data: [
        { name: "الاحد", uv: 40, pv: 2400, amt: 2400 },
        { name: "السبت", uv: 5, pv: 2400, amt: 2400 },
        { name: "الجمعة", uv: 55, pv: 2400, amt: 2400 },
        { name: "الخميس", uv: 25, pv: 2400, amt: 2400 },
        { name: "الاربعاء", uv: 50, pv: 2400, amt: 2400 },
        { name: "الثلاثاء", uv: 20, pv: 2400, amt: 2400 },
        { name: "الاثنين", uv: 15, pv: 2400, amt: 2400 },
        { name: "الاحد", uv: 25, pv: 2400, amt: 2400 },
      ],
    },
    {
      id: 3,
      name: "3 أشهر",
      data: [
        { name: "الاحد", uv: 20, pv: 2400, amt: 2400 },
        { name: "السبت", uv: 45, pv: 2400, amt: 2400 },
        { name: "الجمعة", uv: 25, pv: 2400, amt: 2400 },
        { name: "الخميس", uv: 35, pv: 2400, amt: 2400 },
        { name: "الاربعاء", uv: 10, pv: 2400, amt: 2400 },
        { name: "الثلاثاء", uv: 50, pv: 2400, amt: 2400 },
        { name: "الاثنين", uv: 15, pv: 2400, amt: 2400 },
        { name: "الاحد", uv: 25, pv: 2400, amt: 2400 },
      ],
    },
  ];

  const handlePageChange = (newPage) => {
    console.log(newPage);
    const { name, value } = newPage;
    setPage({ name, value });
  };

  const handlePricesSwitch = () => {
    setIsPricesChecked((prevChecked) => !prevChecked);
    isPricesChecked == false ? setSuccessAlert(true) : setDeactivateAlert(true);
  };

  return (
    <div>
      {typeof window == "undefined" ? (
        ""
      ) : (
        <>
          <DarkNavOverlay
            successAlert={successAlert}
            setSuccessAlert={setSuccessAlert}
            deactivateAlert={deactivateAlert}
            setDeactivateAlert={setDeactivateAlert}
            page={page}
            setPage={setPage}
            toggleSidebar={toggleSidebar}
            name={userData.name}
          >
            <MainSidebar
              handlePageChange={handlePageChange}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              toggleSidebar={toggleSidebar}
              list={list}
            />
            {page.name == "userprofile" ? (
              <div className="space-y-6 translation duration-500 ease-in-out">
                <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                  {list.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handlePageChange(item.page)}
                      >
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
                        <span
                          key={index}
                          onClick={() => {
                            setActiveStat(index);
                          }}
                        >
                          <MainBadge
                            title={item.name}
                            index={index}
                            badgeStyle={`${
                              activeStat == index
                                ? "bg-darkColor text-whiteColor hover:bg-darkColor/80"
                                : "bg-gray-200/80 text-darkColor hover:bg-mediumGreyColor"
                            } truncate px-4 justify-center py-1.5 ml-3 min-w-[80px] block cursor-pointer`}
                          />
                        </span>
                      );
                    })}
                  </div>
                  {tagsList.map((item, index) => {
                    return (
                      <div key={index}>
                        {activeStat == index ? (
                          <Stats stats={item.stats} />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
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
                            <span
                              key={index}
                              onClick={() => {
                                setActiveChartTag(item.name);
                              }}
                            >
                              <MainBadge
                                title={item.name}
                                index={index}
                                badgeStyle={`${
                                  activeChartTag == item.name
                                    ? "bg-darkColor text-whiteColor hover:bg-darkColor/80"
                                    : "bg-gray-200/80 text-darkColor hover:bg-mediumGreyColor"
                                } truncate px-4 justify-center py-1.5 ml-3 block cursor-pointer`}
                              />
                            </span>
                          );
                        })}
                      </div>
                      {chartTagsList.map((item, index) => {
                        return (
                          <div key={index}>
                            {activeChartTag == item.name ? (
                              <SimpleLineChart data={item.data} />
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : page.name == "stock-notification" ? (
              <UserProfileFeatureOne
                isNotificationChecked={isNotificationChecked}
                handleNotificationSwitch={handleNotificationSwitch}
                handleTvSwitch={handleTvSwitch}
                isTvChecked={isTvChecked}
              />
            ) : page.name == "target-prices" ? (
              <UserProfileFeatureTwo
                setIsSecondFeatureModalOpen={setIsSecondFeatureModalOpen}
                isSecondFeatureModalOpen={isSecondFeatureModalOpen}
                handlePricesSwitch={handlePricesSwitch}
                isPricesChecked={isPricesChecked}
              />
            ) : page.name == "weekly-stock" ? (
              <div className="space-y-6">
                <div className="w-full bg-[#F5F7F9] pt-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                  <UserProfileFeatureThree
                  // chartTagsList={chartTagsList} activeStat={activeStat} tagsList={tagsList} setActiveStat={setActiveStat} activeChartTag={activeChartTag} setActiveChartTag={setActiveChartTag}
                  />
                </div>
              </div>
            ) : page.name == "my-account" ? (
              <div className="space-y-6">
                <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                  <UserProfileFeatureFour
                    handlePageChange={handlePageChange}
                    userData={userData}
                    setUserData={setUserData}
                    setOriginalSubscriptionDetails={setOriginalSubscriptionDetails}
                    originalSubscriptionDetails={originalSubscriptionDetails}
                  />
                </div>
              </div>
            ) : page.name == "payment" ? (
              <div className="space-y-6">
                <OrderSummaryForm />
              </div>
            ) : (
              ""
            )}
          </DarkNavOverlay>
          <div>
            <ProfileFooter />
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileSection;
