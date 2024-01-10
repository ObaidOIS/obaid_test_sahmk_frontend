"use client";
import MainBadge from "@/components/widgets/MainBadge";
import SimpleLineChart from "@/components/widgets/SimpleLineChart";
import Stats from "@/components/widgets/Stats";
import React, { useState, useEffect } from "react";
import apiCall from "@/components/common/api";

const UserProfileFeatureThree = () => {
  const [activeStat, setActiveStat] = useState("0");
  const [activeChartTag, setActiveChartTag] = useState("شهر");
  const [tagsList, setTagsList] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [chartData, setChartData] = useState([]);

  const chartTagsList = [
    {
      id: 1,
      name: "يوم",
      apiRange: "1d",
    },
    {
      id: 2,
      name: "5 أيام",
      apiRange: "5d",
    },
    {
      id: 3,
      name: "شهر",
      apiRange: "1mo",
    },
    {
      id: 4,
      name: "6 أشهر",
      apiRange: "6mo",
    },
    {
      id: 5,
      name: "سنة",
      apiRange: "1y",
    },
    {
      id: 6,
      name: "العام حتى الآن",
      apiRange: "ytd",
    },
    {
      id: 7,
      name: "الحد الأقصى",
      apiRange: "max",
    },
  ];

  useEffect(() => {
    // Function to fetch user stocks data
    const fetchUserStocks = async () => {
      try {
        const response = await apiCall("/api/stocks/user-stocks/");
        if (response && response.result) {
          setTagsList(response.result); // Update state with the fetched data
        }
      } catch (error) {
        console.error("Error fetching user stocks:", error.message);
      }
    };

    fetchUserStocks();
  }, []);

  const handleTagClick = async (range, symbol) => {
    if (symbol) {
      const response = await apiCall(
        `/api/stocks/historical_data/?symbol=${symbol}.SR&range=${range}`
      );
      if (response && response.result) {
        // Update your state with the new data
        setChartData(response.result);
      }
    }
  };

  console.log(chartData);

  return (
    <>
      <div className="flex justify-between mb-5 items-center">
        <div className="flex items-end">
          <div className="text-2xl font-medium leading-none m-2">
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
        {tagsList &&
          tagsList.map((item, index) => {
            return (
              <span
                key={index}
                onClick={() => {
                  setActiveStat(index);
                  setSelectedSymbol(item.stock_company);
                }}
              >
                <MainBadge
                  title={item.stock_name || item.stock_company}
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
      {tagsList &&
        tagsList.map((item, index) => {
          return (
            <div key={index}>
              {activeStat == index ? (
                <Stats stats={item.eod_data.eod_data_list} />
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
            {chartTagsList &&
              chartTagsList.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      handleTagClick(item.apiRange, selectedSymbol);
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
          {chartData && chartData.length > 0 && (
            <div>
              <SimpleLineChart data={chartData} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfileFeatureThree;
