"use client";
import MainBadge from "@/components/widgets/MainBadge";
import SimpleLineChart from "@/components/widgets/SimpleLineChart";
import Stats from "@/components/widgets/Stats";
import React, { useState, useEffect } from "react";
import apiCall from "@/components/common/api";
import UserProfileThirdFeatureStats from "../UserProfileThirdFeatureStats";

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
        if (response && response.result.results) {
          setTagsList(response.result.results); // Update state with the fetched data
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
      <UserProfileThirdFeatureStats
        tagsList={tagsList}
        chartTagsList={chartTagsList}
        chartData={chartData}
        setSelectedSymbol={setSelectedSymbol}
        setActiveStat={setActiveStat}
        activeStat={activeStat}
        selectedSymbol={selectedSymbol}
        activeChartTag={activeChartTag}
        setActiveChartTag={setActiveChartTag}
        handleTagClick={handleTagClick}
      />
    </>
  );
};

export default UserProfileFeatureThree;
