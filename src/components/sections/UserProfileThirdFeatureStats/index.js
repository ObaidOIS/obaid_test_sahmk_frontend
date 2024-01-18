import MainBadge from "@/components/widgets/MainBadge";
import SimpleLineChart from "@/components/widgets/SimpleLineChart";
import Stats from "@/components/widgets/Stats";
import React from "react";

const UserProfileThirdFeatureStats = ({tagsList, chartTagsList, chartData, setSelectedSymbol, setActiveStat, activeStat, selectedSymbol, activeChartTag, setActiveChartTag, handleTagClick}) => {
  return (
    <div>
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
      <div className="mt-0 mb-2 pb-4 pt-2">
        <div className="bg-whiteColor py-3 pe-2 shadow-lg border rounded-xl ">
          <div className="space-x-3 flex overflow-x-auto my-5 ps-5">
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
                      } truncate px-4 justify-center py-1.5 my-1 ml-3 block cursor-pointer`}
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
    </div>
  );
}

export default UserProfileThirdFeatureStats
