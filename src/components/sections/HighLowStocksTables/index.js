import React, {useState} from "react";
import BasicStocksTableUI from "@/components/widgets/BasicStocksTableUI";
import TableBlurEffect from "@/components/widgets/TablesBlurEffect";
import PillTabsUI from "@/components/widgets/PillTabsUI";
import UnderlineTabsUI from "@/components/widgets/UnderlineTabsUI";
import StockCardListUI from "../StockCardListUI";

const HighLowStocksTables = ({
  currentPlan,
  handlePageChange,
  page,
  highStocksData,
  lowStocksData,
  sectorsMarketNames,
  selectedMarketSectorName,
  setSelectedMarketSectorName,
  handleHighStocksData,
  handleLowStocksData,
  handleStocksByValueAndQuantity,
}) => {

  const [activeFilter, setActiveFilter] = useState("highest");

  const tableTitles = [
    { title: "الرمز" },
    { title: "الشركة" },
    { title: "السعر" },
    { title: "التغيير" },
    { title: "التغيير %" },
    { title: "الحجم المخزون" },
  ];

  const fakeTableData = [
    {
      stock_symbol: "2993",
      name: "مصرف الراجحي",
      trade_price: "92",
      change: "3.2",
      pct_change: "0.3%",
      volume: "2949922",
    },
    {
      stock_symbol: "2993",
      name: "مصرف الراجحي",
      trade_price: "92",
      change: "3.2",
      pct_change: "0.3%",
      volume: "2949922",
    },
    {
      stock_symbol: "2993",
      name: "مصرف الراجحي",
      trade_price: "92",
      change: "3.2",
      pct_change: "0.3%",
      volume: "2949922",
    },
    {
      stock_symbol: "2993",
      name: "مصرف الراجحي",
      trade_price: "92",
      change: "3.2",
      pct_change: "0.3%",
      volume: "2949922",
    },
    {
      stock_symbol: "2993",
      name: "مصرف الراجحي",
      trade_price: "92",
      change: "3.2",
      pct_change: "0.3%",
      volume: "2949922",
    },
  ];

  
  const handleActiveFilterChange = (tab) => {
    setActiveFilter(tab);
  };

  const tableTabs = [
    { name: "الأكثر ارتفاعا", value: "highest" },
    { name: "الأكثر انخفاظا", value: "lowest" },
    { name: "بالكمية", value: "quantity" },
    { name: "بالقيمة", value: "value" },
  ];

  return (
    <div>
      <div className={`w-full bg-[#F5F7F9] pt-4 !mt-3 ${(currentPlan !== "الباقة المجانية" && (currentPlan?.title && currentPlan?.title) !== "الباقة المجانية") ? "pb-4" : "pb-0"} rounded-3xl space-y-4 border border-gray-300`}>
        {/* <p className="text-lg font-medium ps-4">الأكثر ارتفاعا</p> */}
        <div className="px-4 ">
          <div className={`gap-x-3 overflow-x-auto flex pt-2 pb-2`}>
            {sectorsMarketNames &&
              sectorsMarketNames.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      // handleTagClick(apiRange, item.stock_company);
                      // handleStatisticsChange(item.stock_company);
                      setSelectedMarketSectorName(item.name);
                      // setSelectedSymbol(item.stock_company);
                      console.log(
                        item.stock_company,
                        "stock_company from item"
                      );
                      // handleSelectedStatCurrentValue(
                      //   item.eod_data?.eod_data_list[1]?.value
                      // );
                    }}
                  >
                    {
                      <PillTabsUI
                        tab={item.arabic_name}
                        // index={index}
                        active={selectedMarketSectorName}
                        currentTab={item.name}
                        tabStyle={`transition-transform duration-300 transform translate-x-0`}
                        badgeStyle={`${
                          item.name == selectedMarketSectorName
                            ? "bg-darkColor text-whiteColor hover:bg-darkColor/80"
                            : "bg-gray-200/80 text-darkColor hover:bg-mediumGreyColor"
                        } truncate px-4 justify-center py-1.5 ml-3 min-w-[80px] block cursor-pointer`}
                      />
                    }
                  </span>
                );
              })}
          </div>
        </div>
        <div className="relative bg-[#F5F7F9] mb-4 rounded-3xl">
          {/* <p className="px-4 mt-2 ">الأكثر ارتفاعا</p> */}
          <div className="w-full pt-3">
            <UnderlineTabsUI tabs={tableTabs} activeTab={activeFilter} handleTabChange={handleActiveFilterChange} />
          </div>
          <div className="relative">
            {currentPlan !== "الباقة المجانية" &&
            (currentPlan?.title && currentPlan?.title) !== "الباقة المجانية" ? (
              ""
            ) : (
              <TableBlurEffect
                handlePageChange={handlePageChange}
                page={page}
              />
            )}

            {(currentPlan !== "الباقة المجانية" &&
            (currentPlan?.title && currentPlan?.title) !== "الباقة المجانية"
              ? highStocksData
                ? highStocksData
                : []
              : fakeTableData)?.map((item, index) => {
                  return (
                    <div key={index}>
                      <StockCardListUI
                        currentPlan={currentPlan}
                        tableTitles={tableTitles}
                        tableData={item}
                      />
                    </div>
                  );
                })}
            {/* <BasicStocksTableUI currentPlan={currentPlan} tableTitles={tableTitles} tableData={(currentPlan !== "الباقة المجانية" &&
              (currentPlan?.title && currentPlan?.title) !==
                "الباقة المجانية") ? highStocksData ? highStocksData : [] : fakeTableData} /> */}
          </div>
        </div>
      </div>
      {/* <div className="w-full bg-[#F5F7F9] pt-4 !mt-3 px-4 rounded-3xl space-y-4 border border-gray-300">
        <div className="bg-whiteColor relative mb-4 pt-3 shadow-lg border rounded-3xl">
          <p className="px-4 mt-2">الأكثر انخفاضا</p>
          <div className="relative">
            {currentPlan !== "الباقة المجانية" &&
            (currentPlan?.title && currentPlan?.title) !== "الباقة المجانية" ? (
              ""
            ) : (
              <TableBlurEffect
                handlePageChange={handlePageChange}
                page={page}
              />
            )}
            <BasicStocksTableUI
              tableTitles={tableTitles}
              tableData={
                currentPlan !== "الباقة المجانية" &&
                (currentPlan?.title && currentPlan?.title) !== "الباقة المجانية"
                  ? lowStocksData
                    ? lowStocksData
                    : []
                  : fakeTableData
              }
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HighLowStocksTables;
