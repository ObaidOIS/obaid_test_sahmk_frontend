"use client";
import ProgressBarUI from "@/components/widgets/ProgressBarUI";
import StatsBoxUI from "@/components/widgets/StatsBoxUI";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const UserProfileStats = ({ stats, activeTab, activeStatistics, selectedStockProfileCurrentValue }) => {

  const [precentageIn, setPrecentageIn] = useState("");
  const [precentageOut, setPrecentageOut] = useState("");

  useEffect(() => {
    if(activeStatistics == "trades_info"){
      const filterNames = ["عدد الصفقات الداخلة", "عدد الصفقات الخارجة"];
      const filteredData = stats?.filter((item) => filterNames.includes(item.name));
      const values = filteredData?.map((item) => item.value);
      console.log(values, "values")
      if(values !== undefined){
      const inValue = Number(values[0]);
      const outValue = Number(values[1]);
  
      // Calculate the total value
      const totalValue = inValue + outValue;
      
      // Calculate percentages
      const inPercentage = ((inValue / totalValue) * 100).toFixed(0);
      const outPercentage = ((outValue / totalValue) * 100).toFixed(0);
  
      setPrecentageIn(inPercentage);
      setPrecentageOut(outPercentage);
      }
    }
  }, [activeStatistics, selectedStockProfileCurrentValue ])


  const handleOpenWhatsapp = () => {
    const encodedMessage = encodeURIComponent('مرحبًا! كيف يمكنني مساعدتك اليوم؟ 😃👋');
    window.open(`https://api.whatsapp.com/send/?phone=+966591254924&text=${encodedMessage}`, '_blank');

  }

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="text-2xl font-medium mb-5 ">{activeTab}</div>
        <div className={` rounded-2xl mb-4 border border-mediumGreyColor px-3 py-5 bg-whiteColor ${activeStatistics == "trades_info" ? "" : "hidden"}`}>
          <ProgressBarUI precentageIn={precentageIn} precentageOut={precentageOut} />
        </div>
        <dl className="grid grid-cols-2 gap-x-3 gap-y-3 ">
          {stats && stats.map((stat) => (
            <>
            <div>
              <StatsBoxUI stat={stat} />
            </div>
            {/* <div key={stat.name} className=" flex flex-col">
              <dt className="text-sm leading-7 text-gray-500/90 font-medium truncate">
                {stat.name}
              </dt>
              <dd className={`tracking-tight text-gray-900 font-medium ${stat.name == "نسبة التغيير" ? "text-primaryColor" : ""}`}>
                {stat.value == "-" ? stat.value : isNaN(stat.value) ? stat.value : Number(stat.value).toLocaleString()}
              </dd>
            </div> */}
            </>
          ))}
        </dl>
        <div className="mt-8 border-t border-mediumGreyColor">
        <div onClick={handleOpenWhatsapp} className={` rounded-2xl mb-4 mt-8 shadow-xl hover:shadow-2xl group cursor-pointer px-6 py-4 border border-whiteColor hover:border hover:border-secondaryColor bg-whiteColor`}>
        <div className="mx-auto inline-flex">
                <span className="text-secondaryColor group-hover:text-primaryColor font-medium flex items-center whitespace-nowrap"> 
                <Image loading="eager" src="/assets/icons/whatsapp.svg" width={30} height={30} className="ml-5" alt="img" priority /> 
                انتقل إلى محادثة النظام الذكي على الواتساب
                </span>
            </div>
        </div>
        </div>
      </div>
    </div>
  //   <div className="bg-white pt-8 pb-12 shadow-lg mb-5 rounded-3xl">
  //   <div className="mx-auto max-w-7xl">
  //     <div className="text-lg font-medium mb-5 px-6 lg:px-8">{activeTab}</div>
  //     <div className={` ${activeStatistics == "trades_info" ? "px-3 pb-8" : "hidden"}`}>
  //       <ProgressBarUI precentageIn={precentageIn} precentageOut={precentageOut} />
  //     </div>
  //     <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 px-6 lg:px-8">
  //       {stats && stats.map((stat) => (
  //         <div key={stat.name} className=" flex flex-col">
  //           <dt className="text-sm leading-7 text-gray-500/90 font-medium truncate">
  //             {stat.name}
  //           </dt>
  //           <dd className={`tracking-tight text-gray-900 font-medium ${stat.name == "نسبة التغيير" ? "text-primaryColor" : ""}`}>
  //             {stat.value == "-" ? stat.value : isNaN(stat.value) ? stat.value : Number(stat.value).toLocaleString()}
  //           </dd>
  //         </div>
  //       ))}
  //     </dl>
  //   </div>
  // </div>
  );
};

export default UserProfileStats;