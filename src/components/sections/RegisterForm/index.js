import CheckboxInput from "@/components/widgets/CheckboxInput";
import InputField from "@/components/widgets/InputField";
import PhoneInput from "@/components/widgets/PhoneInput";
import SelectInputBox from "@/components/widgets/SelectInputBox";
import React from "react";
import PrimaryPackageCard from "../PrimaryPackageCard";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import Image from "next/image";

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

  return (
    <div className="mb-20 relative">
      <div className="bg-gray-50 border relative border-gray-300 sm:rounded-2xl px-5 pb-20 md:pb-5 pt-5">
        <div>
          <h2 className={`font-medium text-2xl px-3 mt-2`}>
            <span className=" text-teal-500">01 . </span>
            <span>الباقات </span>
          </h2>
          <div className="bg-white border border-gray-300 rounded-2xl pt-3 pb-8 my-5">
            <PrimaryPackageCard />
          </div>
        </div>
        <div>
          <h2 className={`font-medium text-2xl px-3 my-8`}>
            <span className=" text-teal-500">02 . </span>
            <span> معلومات الحساب </span>
          </h2>
          <div className="grid gap-6 mb-6 md:grid-cols-2 sm:shadow-md border border-gray-300 sm:border-0 bg-white px-6 sm:px-8 pt-10 pb-8 sm:pb-16 mt-8 rounded-2xl sm:rounded-md">
            <InputField title="الاسم الأول" type="text" name="" />
            <InputField title="الاسم الأخير" type="text" name="" />
            <InputField title="البريد الإكلتروني" type="text" name="" />
            <div className="border-t sm:border-t-0 pt-6 sm:pt-0 mt-2 sm:mt-0">
            <PhoneInput title="رقم الجوال" type="text" placeholder="" name="" />
            <div className="flex sm:hidden items-center text-sm text-gray-400 gap-3 mt-6">رقم الجوال يجب أن يكون مشترك في الواتساب</div>
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
            <div className="flex font-medium mt-4  pt-8 border-t ">المزايا التي ترغب بتفعليها </div>

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
        <PrimaryButton
          button="تسجيل"
          buttonStyle="py-5 rounded-md !font-normal w-full justify-center mt-6"
        />
    <Image src="/assets/images/gradient-bottom.png"  width={170} height={170} className="absolute -bottom-12 sm:-bottom-14 -rotate-[2deg] w-[calc(100%-0.75rem)] right-0 left-0 -z-30" alt="img" />
    <Image src="/assets/images/dark-bottom.png"  width={170} height={170} className="absolute -bottom-10 w-[calc(100%-0.75rem)] left-0 right-0 -z-30" alt="img" />

      </div>
    </div>
  );
};

export default RegisterForm;
