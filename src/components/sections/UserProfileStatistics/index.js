"use client";
import MainBadge from "@/components/widgets/MainBadge";
import React, { useEffect, useState } from "react";
import UserProfileStats from "../UserProfileStats";
import UserProfileChart from "../UserProfileChart";
import PillTabsUI from "@/components/widgets/PillTabsUI";
import TabsBarUI from "@/components/widgets/TabsBarUI";
import Image from "next/image";
import Loader from "@/components/widgets/Loader";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import CustomTooltip from "@/components/widgets/CustomTooltip";

const UserProfileStatistics = ({
  chartLoading,
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
  apiRange,
  setApiRange,
  lastUpdatedDates,
  setStockProfileData,
  stockProfileData,
  selectedStatCurrentValue,
  selectedStockProfileCurrentValue,
  currentPlan,
  fakeStatsData,
  handlePageChange,
  handleStatisticsChange,
  setCurrentSelectedValue,
  setSearchQuery,
  originalData,
  setFilteredData,
}) => {
  const [selectedChartCurrentValue, setSelectedChartCurrentValue] =
    useState("");
  // const [
  //   selectedStockProfileCurrentValue,
  //   setSelectedStockProfileCurrentValue,
  // ] = useState({});

  const handleSelectedChartCurrentValue = (value) => {
    setSelectedChartCurrentValue(value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleSelectedChartCurrentValue(chartData[chartData?.length - 1]?.uv);
      // handleSelectedStatCurrentValue(
      //   tagsList[0]?.eod_data?.eod_data_list[1]?.value
      // );
      // console.log(chartData, "hello chart nan");
    }
  }, [chartData, tagsList]);

  // const handleSelectedStatCurrentValue = (statValue) => {
  //   // setSelectedChartCurrentValue(selectedChartCurrentValue);
  //   setSelectedStatCurrentValue(statValue);
  // };

    const handleScrollToTop = () => {
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0 });

    };
  

  console.log(
    chartTagsList[0].apiRange,
    selectedSymbol,
    tagsList,
    activeStat,
    apiRange,
    "hello api"
  );
  const [filterExpand, setFilterExpand] = useState(false);

  // useEffect(() => {
  //   if (stockProfileData[selectedSymbol]) {
  //     console.log(
  //       stockProfileData[selectedSymbol],
  //       stockProfileData,
  //       "user-stock-profile"
  //     );
  //     setSelectedStockProfileCurrentValue(stockProfileData[selectedSymbol]);
  //   }
  //   // else{
  //   //   if(selectedSymbol == "TASI" || selectedSymbol == "NOMUC" ){

  //   //   }else{
  //   //     console.log("can find that symbol in user-stock-profile")
  //   //   }
  //   // }
  // }, [selectedSymbol]);

  // console.log(selectedStockProfileCurrentValue, stockProfileData[selectedSymbol], "hello chart nan")

  return (
    <div>
      <div className="mt-0 mb-2 pb-2 pt-2">
        <div
          className={`space-x-3 ${
            filterExpand ? "" : "overflow-x-auto flex"
          } pt-2 pb-6 `}
        >
          {/* <div className={`space-x-3 ${filterExpand ? "grid grid-cols-3 gap-2 overflow-hidden" : "overflow-x-auto flex" } pt-2 pb-6 `}> */}
          <div
            className={` ${
              filterExpand ? "hidden" : "inline-flex items-center align-middle"
            }`}
          >
            <div
              className={`bg-primaryColor/10 rounded-md ml-3 px-2 mb-2 py-2 ${
                filterExpand ? "flex" : "flex"
              } justify-center transition-max-h duration-300 overflow-hidden max-h-20 items-center`}
            >
              <FunnelIcon
                onClick={() => {
                  setFilterExpand(!filterExpand);
                }}
                className={`cursor-pointer w-5 h-5 ${
                  filterExpand ? "text-whiteColor" : "text-secondaryColor"
                }`}
              />
            </div>
          </div>
          {filterExpand ? (
            <span className="inline-flex flex-wrap gap-2">
              <div
                className={` ${
                  filterExpand ? "items-center align-middle" : "hidden"
                }`}
              >
                <div
                  className={`bg-primaryColor/10 rounded-md px-2 mb-2 py-2 ${
                    filterExpand ? "flex" : "flex"
                  } justify-center transition-max-h duration-300 overflow-hidden max-h-20 items-center`}
                >
                  <FunnelIcon
                    onClick={() => {
                      setFilterExpand(!filterExpand);
                    }}
                    className={`cursor-pointer w-5 h-5 ${
                      filterExpand ? "text-whiteColor" : "text-secondaryColor"
                    }`}
                  />
                </div>
              </div>
              {tagsList &&
                tagsList.map((item, index) => {
                  return (
                    <div
                      // title={item.stock_name || item.stock_company}
                      // className=" inline-block overflow-hidden"
                      className="flex-none group w-[calc(36.2%-1rem)] max-w-[calc(36.2%-1rem)] sm:w-[calc(34.9%-1rem)] sm:max-w-[calc(34.9%-1rem)] relative"
                      // className="flex-none group w-[calc(36.2%-1rem)] max-w-[calc(36.2%-1rem)] sm:w-[calc(34.9%-1rem)] sm:max-w-[calc(34.9%-1rem)] relative"
                      key={index}
                      onClick={() => {
                        setSearchQuery("")
                        setFilteredData(originalData)
                        setCurrentSelectedValue("")
                        handleTagClick(apiRange, item.stock_company);
                        handleStatisticsChange(item.stock_company);
                        setActiveStat(item.stock_name || item.stock_company);
                        setSelectedSymbol(item.stock_company);
                        console.log(item.stock_company, "stock_company from item")
                        // handleSelectedStatCurrentValue(
                        //   item.eod_data?.eod_data_list[1]?.value
                        // );
                      }}
                    >
                      {/* <PrimaryButton button={item.stock_name || item.stock_company}
                  buttonStyle={`py-1 rounded-md mb-4 !font-normal !block overflow-hidden max-w-[130px] sm:max-w-full flex text-ellipsis w- ${activeStat == (item.stock_name || item.stock_company) ? "!bg-secondaryColor " : "!bg-primaryColor/5 !text-secondaryColor"} hover:!shadow-md !truncate justify-center whitespace-nowrap`} /> */}

                      <PrimaryButton
                        button={item?.stock_company == "TASI" ? "تاسي" : item?.stock_company == "NOMUC" ? "سوق نمو" : (item.stock_name || item.stock_company)}
                        buttonStyle={`py-1 !px-2 sm:!px-4 rounded-md mb-4 relative !font-normal overflow-hidden truncate !block w-full  ${
                          activeStat == (item.stock_name || item.stock_company)
                            ? "!bg-secondaryColor "
                            : "!bg-primaryColor/5 !text-secondaryColor"
                        } hover:!shadow-md !truncate justify-center whitespace-nowrap`}
                      />
                      <CustomTooltip text={item?.stock_company == "TASI" ? "تاسي" : item?.stock_company == "NOMUC" ? "سوق نمو" : (item.stock_name || item.stock_company)} />
                    </div>
                  );
                })}
            </span>
          ) : (
            tagsList &&
            tagsList.map((item, index) => {
              return (
                <span
                  key={index}
                  onClick={() => {
                    setSearchQuery("")
                    setFilteredData(originalData)
                    setCurrentSelectedValue("")
                    handleTagClick(apiRange, item.stock_company);
                    handleStatisticsChange(item.stock_company);
                    setActiveStat(item.stock_name || item.stock_company);
                    setSelectedSymbol(item.stock_company);
                    console.log(item.stock_company, "stock_company from item")
                    // handleSelectedStatCurrentValue(
                    //   item.eod_data?.eod_data_list[1]?.value
                    // );
                  }}
                >
                  {
                    <PillTabsUI
                      tab={item.stock_name || item.stock_company}
                      // index={index}
                      active={activeStat}
                      currentTab={item.stock_name || item.stock_company}
                      tabStyle={`transition-transform duration-300 transform translate-x-0`}
                      // badgeStyle={`${
                      //   activeStat == (item.stock_name || item.stock_company)
                      //     ? "bg-darkColor text-whiteColor hover:bg-darkColor/80"
                      //     : "bg-gray-200/80 text-darkColor hover:bg-mediumGreyColor"
                      // } truncate px-4 justify-center py-1.5 ml-3 min-w-[80px] block cursor-pointer`}
                    />
                  }
                </span>
              );
            })
          )}
        </div>
        <div className="bg-whiteColor py-3 pe-3 shadow-lg border rounded-3xl ">
          {chartLoading == false ? (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col ms-3">
                    <div className="text-darkGreyColor">السهم</div>
                    <dd className="tracking-tight text-gray-900 font-medium text-1xl">
                      {activeStat == "TASI" ? "تاسي" : activeStat == "NOMUC" ? "سوق نمو" : activeStat}
                    </dd>
                  </div>
                  <div className="flex items-end">
                    <div className="">
                      <MainBadge
                        title={selectedStatCurrentValue}
                        icon={
                          chartData[0]?.uv <
                          chartData[chartData.length - 1]?.uv ? (
                            <TiArrowSortedUp className="text-primaryColor" />
                          ) : (
                            <TiArrowSortedDown className="text-redColor" />
                          )
                          // <Image unoptimized={true}  loading="eager"
                          //   src="/assets/icons/success-arrow.svg"
                          //   width={8}
                          //   height={8}
                          //   className="cursor-pointer text-red-500"
                          //   alt="img"
                          //   priority
                          // />
                        }
                        dir="ltr"
                        badgeStyle={`${
                          chartData[0]?.uv < chartData[chartData.length - 1]?.uv
                            ? "text-primaryColor bg-primaryColor/10"
                            : "text-redColor bg-redColor/10"
                        } hover:text-gray-700 truncate px-2 !text-xs justify-center py-1.5 ml-3 block cursor-pointer`}
                      />
                    </div>
                    <p className="text-2xl font-medium">
                      {Number(
                        parseFloat(selectedChartCurrentValue).toFixed(2)
                      ).toLocaleString('en-US')}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {/* {(chartData && chartData.length > 0) && ( */}
                {chartData && chartData.length > 0 && (
                  <div>
                    <UserProfileChart
                      apiRange={apiRange}
                      data={chartData}
                      activeChartTag={activeChartTag}
                      handleSelectedChartCurrentValue={
                        handleSelectedChartCurrentValue
                      }
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="animate-pulse">
              <div class="h-[16.5rem] align-middle pt-12 text-center mr-3 mt-2">
                <Image unoptimized={true} 
                  loading="eager"
                  src="/assets/icons/chart-loader.gif"
                  width={160}
                  height={160}
                  className="cursor-pointer mx-auto"
                  alt="img"
                  priority
                />

                <p>جاري جلب البيانات يرجى الانتظار</p>
              </div>
            </div>
          )}
          <div className="my-5 p-2 ms-3 bg-lightGreyColor/60 rounded-full">
            <div className="space-x-3 flex overflow-x-auto rounded-full md:ps-3">
              {chartTagsList &&
                chartTagsList.map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        setApiRange(item.apiRange);
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
      {selectedStockProfileCurrentValue != {} &&
      stockProfileData[selectedSymbol] ? (
        <div className="space-x-3 flex overflow-x-auto pt-2 pb-6 ">
          {selectedStockProfileCurrentValue &&
            Object.keys(selectedStockProfileCurrentValue).map((item, index) => {
              return (
                <span
                  key={index}
                  onClick={() => {
                    setActiveStatistics(item);
                  }}
                >
                  {
                    <PillTabsUI
                      // tab={item}
                      tab={
                        item == "general_view"
                          ? statisticsData[0]
                          : item == "trades_info"
                          ? statisticsData[1]
                          : item == "financials"
                          ? statisticsData[2]
                          : item == "fundamental_info"
                          ? statisticsData[3]
                          : item
                      }
                      // tab={item == "general_view" ? statisticsData[0] : item == "trades_info" ? statisticsData[1] : item == "financials" ? statisticsData[2] : item == "fundamental_info" ? statisticsData[3] : item }
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
          {/* {statisticsData &&
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
          })} */}
        </div>
      ) : (
        ""
      )}
      {selectedStockProfileCurrentValue != {} &&
        stockProfileData[selectedSymbol] && (
          <div className="relative">
          <div className="realtive" >
          {(currentPlan !== "الباقة المجانية" &&
              (currentPlan?.title && currentPlan?.title) !==
                "الباقة المجانية") ? "" : 
                <div className="absolute inset-0 rounded-xl bg-cover bg-[url('/assets/images/free-stats-bg.png')] bg-white/80 backdrop-blur-md">
                <div className="flex justify-center text-whiteColor ">
                  <div className=" w-48 flex gap-2 px-4 py-3 rounded-b-3xl text-center bg-gradient-to-br from-lightAmberColor to-darkAmberColor/60">
                    <Image
                      unoptimized={true}
                      loading="eager"
                      src="/assets/icons/lock.svg"
                      width={16}
                      height={16}
                      alt="Image"
                      priority
                    />
                    <p className="text-sm">قم بترقية باقتك لتطلع على تفاصيل السهم</p>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Image
                    unoptimized={true}
                    loading="eager"
                    src="/assets/icons/free-stats-icon.svg"
                    width={210}
                    height={210}
                    alt="Image"
                    priority
                  />
                </div>
                <div className="flex justify-center">
                  <PrimaryButton
                    button="الترقية الآن"
                    buttonStyle="py-2 !px-10 rounded-xl bg-mediumGreenColor !font-normal justify-center mt-3"
                    onClick={()=>{handlePageChange({ name: "my-account", value: "باقتي وحسابي" }); handleScrollToTop()}}
                  />
                </div>
              </div>
                // <div className="absolute inset-0 rounded-xl bg-cover bg-[url('/assets/images/free-stats-bg.png')] bg-white/70 backdrop-blur-md"></div>
                }
            {/* {activeStat == (item.stock_name || item.stock_company) ? ( */}
            <UserProfileStats
              selectedStockProfileCurrentValue={
                selectedStockProfileCurrentValue
              }
              stats={(currentPlan !== "الباقة المجانية" &&
              (currentPlan?.title && currentPlan?.title) !==
                "الباقة المجانية") ?  selectedStockProfileCurrentValue && selectedStockProfileCurrentValue[activeStatistics] : fakeStatsData[activeStatistics]}
              activeStatistics={activeStatistics}
              activeTab={
                activeStatistics == "general_view"
                  ? statisticsData[0]
                  : activeStatistics == "trades_info"
                  ? statisticsData[1]
                  : activeStatistics == "financials"
                  ? statisticsData[2]
                  : activeStatistics == "fundamental_info"
                  ? statisticsData[3]
                  : activeStatistics
              }
            />
            {/* ) : (
                ""
              )} */}
          </div>
          </div>
        )}
      {/* {tagsList &&
        tagsList.map((item, index) => {
          return (
            <div key={index}>
              {activeStat == (item.stock_name || item.stock_company) ? (
                <UserProfileStats 
                stats={item.eod_data.eod_data_list} 
                activeTab={activeStatistics == "general_view" ? statisticsData[0] : activeStatistics == "trades_info" ? statisticsData[1] : activeStatistics == "financials" ? statisticsData[2] : activeStatistics == "fundamental_info" ? statisticsData[3] : activeStatistics} />
              ) : (
                ""
              )}
            </div>
          );
        })} */}
      <div>
      </div>
    </div>
  );
};

export default UserProfileStatistics;
