"use client";
import React, {useState} from "react";
import CheckboxInput from "@/components/widgets/CheckboxInput";
import SelectInputBox from "@/components/widgets/SelectInputBox";
import PrimaryPackageCard from "../PrimaryPackageCard";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import Image from "next/image";
import ModalUI from "@/components/widgets/ModalUI";
import RegisterPricingModal from "../RegisterPricingModal";
import Link from "next/link";
import PhoneNumberUI from "@/components/widgets/PhoneNumberUI";
import { BH, KW, OM, QA, SA, AE } from 'country-flag-icons/react/3x2'
import InputFieldUI from "@/components/widgets/InputFieldUI";

const RegisterForm = () => {
  const selectboxList = [
    { title: "کمپنی ایک" },
    { title: "کمپنی دو" },
    { title: "کمپنی تیسری" },
  ];

  const checkboxes = [
    {
      title: "استقبال أسعار الافتتاح والاغلاق لأسهمي",
      desc: "احصل على أسعار مباشرة لاشتراكات الباقة بريميوم والمتقدمة ومتأخرة 15دقيقة للباقة المجانية",
      badge: "الأسعار مباشرة",
    },
    {
      title: "تفعيل ميزة الأسعار المستهدفة",
      desc: "تتيح لك هذه الخاصية وضع اسعار مستهدفه للاسهم الخاصة بك",
      badge: "",
    },
    {
      title: "استلام تقرير اسبوعي لأداء أسهمك",
      desc: "تتيح لك هذه الخاصية وضع اسعار مستهدفه للاسهم الخاصة بك",
      badge: "",
    },
  ];

const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);


const countryCodes = [
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
    name: "Saudi Arabia",
    dial_code: "+966",
    icon : <SA title="Saudi Arabia"/>,
  },
  {
    name: "UAE",
    dial_code: "+971",
    icon : <AE title="UAE"/>,
  },
];

const [activeItem, setActiveItem] = useState(null);

  return (
    <>
     {isPricingModalOpen ? (
        <ModalUI
          onClose={() => setIsPricingModalOpen(false)}
          isOpen={isPricingModalOpen}
          title="الباقات"
          button="إضافة هدف جديد"
          content={
            <RegisterPricingModal isOpen={isPricingModalOpen} />
          }
        />
      ) : (
        ""
      )}
    <div className="mb-20 relative">
      <div className="bg-gray-50 border relative border-gray-300 sm:rounded-2xl px-5 pb-20 md:pb-5 pt-5">
        <div>
          <h2 className={`font-medium text-2xl px-3 mt-2`}>
            <span className=" text-teal-500">01 . </span>
            <span>الباقات </span>
          </h2>
          <div className="bg-white border border-gray-300 rounded-2xl pt-3 pb-8 my-5">
            <PrimaryPackageCard setIsPricingModalOpen={setIsPricingModalOpen} />
          </div>
        </div>
        <div>
          <h2 className={`font-medium text-2xl px-3 my-8`}>
            <span className=" text-teal-500">02 . </span>
            <span> معلومات الحساب </span>
          </h2>
          <div className="grid gap-6 mb-6 md:grid-cols-2 sm:shadow-md border border-gray-300 sm:border-0 bg-white px-6 sm:px-8 pt-10 pb-8 sm:pb-16 mt-8 rounded-2xl sm:rounded-md">
            <InputFieldUI label="الاسم الأول" type="text" name="first-name" />
            <InputFieldUI label="الاسم الأخير" type="text" name="last-name" />
            <InputFieldUI label="البريد الإكلتروني" type="email" name="email" />
            <div className="border-t sm:border-t-0 pt-6 sm:pt-0 mt-2 sm:mt-0">
              <PhoneNumberUI
                title="رقم الجوال"
                dataList={countryCodes}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
              <div className="flex sm:hidden items-center text-sm text-gray-400 gap-3 mt-6">
                رقم الجوال يجب أن يكون مشترك في الواتساب
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className={`font-medium text-2xl px-3 mt-6`}>
            <span className=" text-teal-500">03 . </span>
            <span>الخطوة الأخيرة </span>
          </h2>
          <div className=" bg-white px-6 pb-14 pt-6 sm:px-8 mt-8 sm:border border-gray-300 rounded-2xl sm:rounded-md sm:shadow-md">
            <SelectInputBox
              title="تفعيل الشركات"
              selectedOption={``}
              list={selectboxList}
            />
            <div className="flex text-teal-950 mt-4">يمكنك إعدادها لاحقا</div>
            <div className="flex font-medium mt-4  pt-8 border-t ">
              المزايا التي ترغب بتفعليها{" "}
            </div>

            {checkboxes.map((item, index) => {
              return (
                <div key={index}>
                  <CheckboxInput
                    title={item.title}
                    desc={item.desc}
                    badge={item.badge}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Link href="/auth/order" >
        <PrimaryButton
          button="تسجيل"
          buttonStyle="py-5 rounded-md !font-normal w-full justify-center mt-6"
        />
        </Link>
        <Image
          src="/assets/images/gradient-bottom.svg"
          width={170}
          height={170}
          className="absolute -bottom-14 w-[calc(100%-0.75rem)] left-0 right-0 -z-30"
          alt="img"
        />
      </div>
    </div>
    </>
  );
};

export default RegisterForm;
