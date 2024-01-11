"use client";
import React, { useState } from "react";
import RadioTabs from "@/components/widgets/RadioTabs";
import Image from "next/image";
import RadioCardGroup from "@/components/widgets/RadioCardGroup";

const RegisterPricingModal = ({ selectedOption, setSelectedOption, frequencies, frequency, setFrequency, pricingRadio, setSelectedItems }) => {

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setSelectedItems([]);
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
