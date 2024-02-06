"use client";
import React, { useState } from "react";
import RadioTabs from "@/components/widgets/RadioTabs";
import Image from "next/image";
import RadioCardGroup from "@/components/widgets/RadioCardGroup";
import { useRouter } from "next/navigation";

const RegisterPricingModal = ({ selectedOption, setSelectedOption, frequencies, frequency, setFrequency, pricingRadio, setSelectedItems, handleUpgradPlan, currentPlan, currentPlanDuration, handleUpgardPlanDuration, originalSubscriptionDetails, subscriptionTypeMap}) => {

  const router = useRouter();
  const handleOptionChange = (value, allData) => {
    setSelectedOption(value);
    setSelectedItems != undefined ? setSelectedItems([]) : "";
    handleUpgradPlan != undefined ? handleUpgradPlan({title: allData.title, desc: allData.desc, price:allData.price}) : "";
  };

  return (
    <div>
      <div>
        <div className="mx-auto">
        <div className="w-40 mb-4 mt-7 mx-auto">
        <RadioTabs
          frequencies={frequencies}
          setFrequency={setFrequency}
          frequency={frequency}
          handleUpgardPlanDuration={handleUpgardPlanDuration}
          currentPlanDuration={currentPlanDuration}
        />
        </div>
        </div>
        <div>
          <fieldset>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <RadioCardGroup
                dataList={pricingRadio}
                frequency={frequency}
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
                currentPlan={currentPlan}
                currentPlanDuration={currentPlanDuration}
                originalSubscriptionDetails={originalSubscriptionDetails}
                subscriptionTypeMap={subscriptionTypeMap}
              />
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default RegisterPricingModal;
