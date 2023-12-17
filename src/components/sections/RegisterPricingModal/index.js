"use client";
import React, {useState} from "react";
import BasicModal from "@/components/widgets/BasicModal";
import RadioTabs from "@/components/widgets/RadioTabs";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import PricingRadioButton from "@/components/widgets/PricingRadioButton";
import Image from "next/image";

const RegisterPricingModal = () => {

    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };
  const radioTabOptions = [{ tab: "شهري" }, { tab: "سنوي" }];

  const footerLinks = [
    {
      title: "الباقة المجانية",
      icon: (
        <Image
          src="/assets/icons/blue-check.svg"
          width={25}
          height={25}
          alt="img"
        />
      ),
      desc: "باقة بريميوم مميزة وأسعار مباشرة",
      price: "مجاناً",
    },
    {
      title: "باقة بريميوم",
      icon: (
        <Image
          src="/assets/icons/purple-check-icon.svg"
          width={25}
          height={25}
          alt="img"
        />
      ),
      desc: "باقة بريميوم مميزة وأسعار مباشرة",
      price: "49 ريال",
    },
    {
      title: "الباقة المتقدمة",
      icon: (
        <Image
          src="/assets/icons/yellow-check.svg"
          width={25}
          height={25}
          alt="img"
        />
      ),
      desc: "باقة بريميوم مميزة وأسعار مباشرة",
      price: "99 ريال",
    },
  ];

  return (
    <div>
      <BasicModal heading={`الباقات`}>
        <div>
          <RadioTabs radioTabOptions={radioTabOptions} />
          <div>
            {footerLinks.map((item, index) => {
              return (
                <div key={index}>
                  <PricingRadioButton
                   isChecked={isChecked}
                    title={item.title}
                    icon={item.icon}
                    desc={item.desc}
                    price={item.price}
                  />
                </div>
              );
            })}
          </div>
          <PrimaryButton
            button="إضافة هدف جديد"
            buttonStyle="w-full rounded-lg d-flex font-normal justify-center py-3"
          />
        </div>
      </BasicModal>
    </div>
  );
};

export default RegisterPricingModal;
