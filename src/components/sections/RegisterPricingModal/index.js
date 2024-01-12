"use client";
import React, { useState } from "react";
import RadioTabs from "@/components/widgets/RadioTabs";
import Image from "next/image";
import RadioCardGroup from "@/components/widgets/RadioCardGroup";
import { useRouter } from "next/navigation";

const RegisterPricingModal = ({ selectedOption, setSelectedOption, frequencies, frequency, setFrequency, pricingRadio, setSelectedItems, handlePlanChange }) => {
  const router = useRouter();
  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setSelectedItems != undefined ? setSelectedItems([]) : "";
    // handlePlanChange != undefined ? handlePlanChange : "";
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
              />
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default RegisterPricingModal;
