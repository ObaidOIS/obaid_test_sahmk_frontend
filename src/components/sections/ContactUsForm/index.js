"use client";
import React, { useState } from "react";
import Footer from "@/components/layouts/Footer";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import SwitchUI from "@/components/widgets/SwitchUI";
import TextAreaUI from "@/components/widgets/TextAreaUI";
import PhoneNumberUI from "@/components/widgets/PhoneNumberUI";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import { BH, KW, OM, QA, SA, AE, PK } from 'country-flag-icons/react/3x2'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ContactUsForm = () => {
  const [agreed, setAgreed] = useState(false);

  const handleSwitchPolicy = () => {
    setAgreed((prevChecked) => !prevChecked);
  };

  const countryCodes = [
    {
      name: "Saudi Arabia",
      dial_code: "+966",
      icon : <SA title="Saudi Arabia"/>,
    },
    {
      name: "Bahrain",
      dial_code: "+973",
      icon : <BH title="Bahrain"/>,
    },
    {
      name: "Kuwait",
      dial_code: "+965",
      icon : <KW title="Kuwait"/>,
    },
    {
      name: "Oman",
      dial_code: "+968",
      icon : <OM title="Oman"/>,
    },
    {
      name: "Qatar",
      dial_code: "+974",
      icon : <QA title="Qatar"/>,
    },
    {
      name: "UAE",
      dial_code: "+971",
      icon : <AE title="UAE"/>,
    },
  ];

  const [activeItem, setActiveItem] = useState(null);

  return (
    <div>
      <div className=" px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            اتصل بنا
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            إذا كان لديك أي أسئلة، فلا تتردد في الاتصال بنا. نحن هنا لمساعدتك!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <InputFieldUI label="الاسم الأول" name="first-name" />
            </div>
            <div>
              <InputFieldUI label="اسم العائلة" name="last-name" />
            </div>
            <div className="sm:col-span-2">
              <InputFieldUI label="شركة" name="company" />
            </div>
            <div className="sm:col-span-2">
              <InputFieldUI label="بريد إلكتروني" name="email" />
            </div>
            <div className="sm:col-span-2">
              <PhoneNumberUI
                title="رقم التليفون"
                dataList={countryCodes}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </div>
            <div className="sm:col-span-2">
              <TextAreaUI label="رسالة" name="message" />
            </div>
            <div className="sm:col-span-2">
              <SwitchUI
                handleSwitch={handleSwitchPolicy}
                isChecked={agreed}
                label={
                  <span className="text-sm leading-6 mr-3 text-gray-600">
                    من خلال تحديد هذا، فإنك توافق على لدينا{" "}
                    <a href="/privacypolicy" target="_blank" className="font-semibold text-primaryColor">
                      سياسة الخصوصية
                    </a>
                    .
                  </span>
                }
              />
            </div>
          </div>
          <div className="mt-10">
            <PrimaryButton
              button="إكمال الدفع"
              buttonStyle="py-3 rounded-md !font-normal !bg-secondaryColor hover:!bg-primaryColor w-full justify-center mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
