"use client";
import MainBadge from "@/components/widgets/MainBadge";
import React, { useState } from "react";
import UserProfileStats from "../UserProfileStats";
import UserProfileChart from "../UserProfileChart";
import PillTabsUI from "@/components/widgets/PillTabsUI";
import TabsBarUI from "@/components/widgets/TabsBarUI";
import Image from "next/image";

const UserProfileStatistics = ({
  statisticsData,
  tagsList,
  chartTagsList,
  chartData,
  setSelectedSymbol,
  setActiveStat,
  activeStat,
  selectedSymbol,
  activeChartTag,
  setActiveChartTag,
  handleTagClick,
  setActiveStatistics,
  activeStatistics,
}) => {
  const [selectedChartCurrentValue, setSelectedChartCurrentValue] = useState("");
  const [selectedStatCurrentValue, setSelectedStatCurrentValue] = useState("");

  const handleSelectedChartCurrentValue = (value) => {
    setSelectedChartCurrentValue(value);
  };

  const handleSelectedStatCurrentValue = (statValue) => {
    // setSelectedChartCurrentValue(selectedChartCurrentValue);
    setSelectedStatCurrentValue(statValue);
  };

  return (
    <div>
      <div className="mt-0 mb-2 pb-4 pt-2">
      <div className="space-x-3 flex overflow-x-auto pt-2 pb-6 ">
        <Image src="/assets/icons/success-filter.svg"
          width={24}
          height={24}  
          className="cursor-pointer mx-4" alt="img" />
        {tagsList &&
          tagsList.map((item, index) => {
            return (
              <span
                key={index}
                onClick={() => {
                  setActiveStat(item.stock_name || item.stock_company);
                  setSelectedSymbol(item.stock_company);
                  handleSelectedStatCurrentValue(item.eod_data?.eod_data_list[1]?.value);
                }}
              >
                {
                  <PillTabsUI
                    tab={item.stock_name || item.stock_company}
                    index={index}
                    active={activeStat}
                    currentTab={item.stock_name || item.stock_company}
                    badgeStyle={`${
                      activeStat == (item.stock_name || item.stock_company)
                        ? "bg-darkColor text-whiteColor hover:bg-darkColor/80"
                        : "bg-gray-200/80 text-darkColor hover:bg-mediumGreyColor"
                    } truncate px-4 justify-center py-1.5 ml-3 min-w-[80px] block cursor-pointer`}
                  />
                }
              </span>
            );
          })}
      </div>
        <div className="bg-whiteColor py-3 pe-3 shadow-lg border rounded-3xl ">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col ms-3">
                <dt className="text-sm leading-7 text-gray-500/90 font-medium truncate">
                  السهم
                </dt>
                <dd className="tracking-tight text-gray-900 font-medium ">
                  {activeStat}
                </dd>
              </div>
              <div className="flex items-end">
                <div className="">
                  <MainBadge
                    title={selectedStatCurrentValue}
                    icon={<Image src="/assets/icons/success-arrow.svg"
                    width={8}
                    height={8}  
                    className="cursor-pointer" alt="img" />}
                    badgeStyle={`text-primaryColor bg-primaryColor/10 hover:text-gray-700 truncate px-2 !text-xs justify-center py-1.5 ml-3 block cursor-pointer`}
                  />
                </div>
                <p className="text-2xl font-medium">
                  {parseFloat(selectedChartCurrentValue).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div>
            {chartData && chartData.length > 0 && (
              <div>
                <UserProfileChart
                  data={chartData}
                  activeChartTag={activeChartTag}
                  handleSelectedChartCurrentValue={
                    handleSelectedChartCurrentValue
                  }
                />
              </div>
            )}
          </div>
          <div className="my-5 p-2 ms-3 bg-lightGreyColor/60 rounded-full">
            <div className="space-x-3 flex overflow-x-auto  rounded-full md:ps-3">
              {chartTagsList &&
                chartTagsList.map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        handleTagClick(item.apiRange, selectedSymbol);
                        setActiveChartTag(item.name);
                        handleSelectedChartCurrentValue(
                          chartData[chartData?.length - 1]?.uv
                        );
                      }}
                    >
                      <TabsBarUI
                        tab={item.name}
                        index={index}
                        active={activeChartTag}
                        tabs={chartTagsList}
                        badgeStyle={`${
                          activeChartTag == item.name
                            ? "bg-darkColor text-whiteColor hover:bg-darkColor/80"
                            : "bg-gray-200/80 text-darkColor hover:bg-mediumGreyColor"
                        } truncate px-4 justify-center py-1.5 my-1 ml-3 block cursor-pointer`}
                      />
                      {/* <MainBadge
                      title={item.name}
                      index={index}
                      badgeStyle={`${
                        activeChartTag == item.name
                          ? "bg-darkColor text-whiteColor hover:bg-darkColor/80"
                          : "bg-gray-200/80 text-darkColor hover:bg-mediumGreyColor"
                      } truncate px-4 justify-center py-1.5 my-1 ml-3 block cursor-pointer`}
                    /> */}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-x-3 flex overflow-x-auto pt-2 pb-6 ">
        {statisticsData &&
          statisticsData.map((item, index) => {
            return (
              <span
                key={index}
                onClick={() => {
                  setActiveStatistics(item);
                }}
              >
                {
                  <PillTabsUI
                    tab={item}
                    index={index}
                    active={activeStatistics}
                    currentTab={item}
                    badgeStyle={`${
                      activeStatistics == item
                        ? "bg-darkColor text-whiteColor hover:bg-darkColor/80"
                        : "bg-gray-200/80 text-darkColor hover:bg-mediumGreyColor"
                    } truncate px-4 justify-center py-1.5 ml-3 min-w-[80px] block cursor-pointer`}
                  />
                }
              </span>
            );
          })}
      </div>
      {tagsList &&
        tagsList.map((item, index) => {
          return (
            <div key={index}>
              {activeStat == index ? (
                <UserProfileStats stats={item.eod_data.eod_data_list} />
              ) : (
                ""
              )}
            </div>
          );
        })}

      <div>
        <div className="font-medium text-right leading-none m-2 mt-5 mb-14">
          تحديث البيانات{" "}
          <span className="font-normal text-gray-500/80">
            اليوم الساعة 2:00
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileStatistics;
