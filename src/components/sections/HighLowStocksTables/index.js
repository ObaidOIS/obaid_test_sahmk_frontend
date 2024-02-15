import React from "react";
import BasicStocksTableUI from "@/components/widgets/BasicStocksTableUI";
import TableBlurEffect from "@/components/widgets/TablesBlurEffect";

const HighLowStocksTables = ({currentPlan, handlePageChange, page, highStocksData, lowStocksData}) => {
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


  return (
    <div>      
      <div className="w-full bg-[#F5F7F9] py-4 !mt-3 px-4 rounded-3xl space-y-4 border border-gray-300">
        {/* <p className="text-lg font-medium ps-4">الأكثر ارتفاعا</p> */}
       <div className="relative bg-whiteColor pt-3 shadow-lg border rounded-3xl ">
          <p className="px-4 mt-2 ">الأكثر ارتفاعا</p>
          <div className="relative">
          {(currentPlan !== "الباقة المجانية" &&
              (currentPlan?.title && currentPlan?.title) !==
                "الباقة المجانية") ? "" : 
                <TableBlurEffect handlePageChange={handlePageChange} page={page} />
                }
          <BasicStocksTableUI currentPlan={currentPlan} tableTitles={tableTitles} tableData={(currentPlan !== "الباقة المجانية" &&
              (currentPlan?.title && currentPlan?.title) !==
                "الباقة المجانية") ? highStocksData ? highStocksData : [] : fakeTableData} />
        </div>
      </div>
      </div>
      <div className="w-full bg-[#F5F7F9] py-4 !mt-3 px-4 rounded-3xl space-y-4 border border-gray-300">
        {/* <p className="text-lg font-medium ps-4">الأكثر  انخفاضا</p> */}
        <div className="bg-whiteColor relative pt-3 shadow-lg border rounded-3xl ">
          <p className="px-4 mt-2">الأكثر  انخفاضا</p>
          <div className="relative">
          {(currentPlan !== "الباقة المجانية" &&
              (currentPlan?.title && currentPlan?.title) !==
                "الباقة المجانية") ? "" : 
                <TableBlurEffect handlePageChange={handlePageChange} page={page} />
                }
          <BasicStocksTableUI tableTitles={tableTitles}  tableData={(currentPlan !== "الباقة المجانية" &&
              (currentPlan?.title && currentPlan?.title) !==
                "الباقة المجانية") ? lowStocksData ? lowStocksData : [] : fakeTableData} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default HighLowStocksTables;
