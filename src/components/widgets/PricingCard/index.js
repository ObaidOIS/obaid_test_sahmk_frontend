import React from "react";
import PrimaryButton from "../PrimaryButton";
import Image from "next/image";
import OutlineButton from "../OutlineButton";

const PricingCard = ({primaryCard, card}) => {

    
  const benefitList = [
    { name: "وصول لأسهم أكثر من +300 شركة" },
    { name: "معرفة تفاصيل الشركات المدرجة في الأسهم" },
    { name: "السؤال عن أوقات التوزيعات لأي سهم" },
    { name: "الحصول على تنبيه بأسعار الافتتاح والاغلاق" },
    { name: "تفعيل خاصية إضافة هدف لأسهمك الحالية" },
    { name: "الحصول على تقرير اسبوعي لأداء السهم PDF" },
  ];

  return (
    <div>
      <div className="pt-5 mx-4 md:mx-0 flex flex-row">
        <div className={`${primaryCard ? "ring-4 ring-teal-500" : "border border-gray-300"} w-full p-8 rounded-3xl bg-white`}>
          <h1 className={`${primaryCard ? "text-teal-500" : ""} font-semibold text-2xl`}>باقة البريميوم</h1>
          <p className="pt-2 tracking-wide my-4">
            <span className="text-gray-400/70 text-sm">
              الباقة الأساسية تستطيع من خلالها الاستعلام عن اسعار الاسهم وسعر
              الافتتاح والاغلاق اليومي لكل سهم
            </span>
          </p>
          <p className="pt-2 tracking-wide mb-20">
            <span className="text-3xl font-bold">49 ريال </span>
            <span className="text-gray-600/90 text-xl font-semibold"> / شهري </span>
          </p>
          <div className="">
           {primaryCard ? 
            <PrimaryButton
              button="اشترك الآن"
              buttonStyle="w-full rounded-md d-flex justify-center text-xl font-medium py-3 !bg-teal-500"
            /> : 
            <OutlineButton
              button="اشترك الآن"
              buttonStyle="w-full rounded-md d-flex justify-center !border-teal-500 border-2 text-xl font-medium py-3 !text-teal-500"
            /> }
          </div>

          <div className="flex flex-wrap mt-9">
            <ul>
            {benefitList.map((item, index) => {
                return (
                <li key={index} className="flex items-center mb-2">
                    <div className=" rounded-full p-2 fill-current self-start text-green-700">
                    <Image
                        src={(card == "intermediate" || card == "enterprise") && (index != 0 && index != 1)  ? "/assets/icons/disable-check.svg" : "/assets/icons/check-icon.svg"}
                        width={20}
                        height={20}
                        alt="img"
                    />
                    </div>
                    <span className={`${(card == "intermediate" || card == "enterprise") && (index != 0 && index != 1)  ? "text-gray-300" : "text-gray-700"} font-medium ml-3`}>{item.name}</span>
                </li>
              );
            })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
