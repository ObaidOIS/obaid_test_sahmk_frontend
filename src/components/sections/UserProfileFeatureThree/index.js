"use client";
import MainBadge from "@/components/widgets/MainBadge";
import SimpleLineChart from "@/components/widgets/SimpleLineChart";
import Stats from "@/components/widgets/Stats";
import React, { useState } from "react";

const UserProfileFeatureThree = () => {
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

  return (
    <>
      <div className="flex justify-between mb-5 items-center">
        <div className="flex items-end">
          <div className="text-2xl font-medium leading-none m-2">
            {" "}
            مؤشر السوق{" "}
          </div>
          <MainBadge
            title="الأسعار متأخرة"
            badgeStyle="bg-amber-100 text-amber-500 px-4 py-1"
          />
        </div>
        <p className="text-left font-medium text-sm">
          تقرير اسبوع : 12/01/2024
        </p>
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
            {activeStat == index ? <Stats stats={item.stats} /> : ""}
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
    </>
  );
};

export default UserProfileFeatureThree;
