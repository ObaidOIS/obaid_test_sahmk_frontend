import React from "react";
import PricingCard from "@/components/widgets/PricingCard";
import BasicHeading from "@/components/widgets/BasicHeading";
import RadioTabs from "@/components/widgets/RadioTabs";

const PricingSection = () => {
  const radioTabOptions = [{ tab: "شهري" }, { tab: "سنوي" }];

  return (
    <div className="bg-gray-100 py-2">
      <div className="md:mx-8 ">
        <div className="max-w-2xl mb-8 mt-20 mx-auto text-center ">
          <div className="text-3xl font-semibold mb-5 leading-tight md:leading-none">
            كل بيانات الأسهم أصبحت أسرع وأقرب إليك
          </div>
          <p className=" font-semibold text-gray-400 ">
            بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن
            الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة{" "}
          </p>
        </div>
        <div className="my-20">
          <RadioTabs radioTabOptions={radioTabOptions} />
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 mb-20 gap-x-6">
          <div>
            <PricingCard card="enterprise" />
          </div>
          <div>
            <PricingCard primaryCard={true} card="intermediate" />
          </div>
          <div>
            <PricingCard card="basic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
