import GroupedRowsTable from '@/components/widgets/GroupedRowsTable';
import PillTabsUI from '@/components/widgets/PillTabsUI';
import React from 'react'

const StocksDetailsTable = ({list, handleStockTableDetail, activeStat, setStockDetailsSelectedMarket, stockDetailsTableData, currentPlan}) => {

  const tableHeadings = [
      { name: "company", arabic_name: "الشركة" },
      { name: "price", arabic_name: "السعر" },
      { name: "value change", arabic_name: "تغيير القيمة" },
      { name: "change percent", arabic_name: "نسبة التغيير" }
  ];

  return (
    <div>
      <div
        className={`w-full bg-[#F5F7F9] pt-4 pb-4 !mt-3 
        // {
        //   currentPlan !== "الباقة المجانية" &&
        //   (currentPlan?.title && currentPlan?.title) !== "الباقة المجانية"
        //     ? "pb-4"
        //     : "pb-0"
        // } 
        rounded-3xl space-y-4 border border-gray-300`}
      >
        {/* <p className="text-lg font-medium ps-4">الأكثر ارتفاعا</p> */}
        <div className="px-4 ">
      <div className="mt-0 mb-2 pb-2 pt-0">
        <div
          className={`gap-x-3 overflow-x-auto flex pt-2`}
        >
      {list &&
            list.map((item, index) => {
              return (
                <span
                  key={index}
                  onClick={()=>{
                    setStockDetailsSelectedMarket(item.name);
                    handleStockTableDetail(item.name);
                  }}
                //   onClick={() => {
                //     setSearchQuery("")
                //     setFilteredData(originalData)
                //     setCurrentSelectedValue("")
                //     handleTagClick(apiRange, item.stock_company);
                //     handleStatisticsChange(item.stock_company);
                //     setActiveStat(item.stock_name || item.stock_company);
                //     setSelectedSymbol(item.stock_company);
                //     console.log(item.stock_company, "stock_company from item")
                //     // handleSelectedStatCurrentValue(
                //     //   item.eod_data?.eod_data_list[1]?.value
                //     // );
                //   }}
                >
                  
                    <PillTabsUI
                      tab={item.arabic_name}
                      active={activeStat}
                      currentTab={item.name}
                    />
                  
                </span>
              );
            })}
        </div>
        </div>
        </div>
            <GroupedRowsTable tableData={stockDetailsTableData} tableHeadings={tableHeadings} />
        </div>
      </div>
  )
}

export default StocksDetailsTable
