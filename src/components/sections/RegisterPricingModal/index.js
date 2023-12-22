"use client";
import React, { useState } from "react";
import RadioTabs from "@/components/widgets/RadioTabs";
import Image from "next/image";
import RadioCardGroup from "@/components/widgets/RadioCardGroup";

const RegisterPricingModal = () => {
  const [selectedOption, setSelectedOption] = useState("الباقة المجانية");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const frequencies = [
    { value: "monthly", label: "شهري", priceSuffix: "/شهري" },
    { value: "annually", label: "سنوي", priceSuffix: "/سنوي" },
  ];

  const [frequency, setFrequency] = useState(frequencies[0]);

  const pricingRadio = [
    {
      title: "الباقة المجانية",
      icon: (
        <Image
          src="/assets/icons/blue-check.svg"
          width={25}
          height={25}
          alt="img"
          className="mt-1"
        />
      ),
      desc: "باقة بريميوم مميزة وأسعار مباشرة",
      price: { monthly: "مجاناً", annually: "48 ريال" },
    },
    {
      title: "باقة بريميوم",
      icon: (
        <Image
          src="/assets/icons/purple-check-icon.svg"
          width={25}
          height={25}
          alt="img"
          className="mt-1"
        />
      ),
      desc: "باقة بريميوم مميزة وأسعار مباشرة",
      price: { monthly: "49 ريال", annually: "488 ريال" },
    },
    {
      title: "الباقة المتقدمة",
      icon: (
        <Image
          src="/assets/icons/yellow-check.svg"
          width={25}
          height={25}
          alt="img"
          className="mt-1"
        />
      ),
      desc: "باقة بريميوم مميزة وأسعار مباشرة",
      price: { monthly: "99 ريال", annually: "688 ريال" },
    },
  ];

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
