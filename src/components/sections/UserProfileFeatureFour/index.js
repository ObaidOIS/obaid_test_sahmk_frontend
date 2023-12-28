import AvatarWithText from "@/components/widgets/AvatarWithText";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import PhoneNumberUI from "@/components/widgets/PhoneNumberUI";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import SimpleCardHeader from "@/components/widgets/SimpleCardHeader";
import Image from "next/image";
import React, {useState} from "react";
import RegisterPricingModal from "../RegisterPricingModal";
import ModalUI from "@/components/widgets/ModalUI";
import { BH, KW, OM, QA, SA, AE } from 'country-flag-icons/react/3x2'

const UserProfileFeatureFour = ({handlePageChange}) => {

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
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState("الباقة المجانية");
  
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
    features: { monthly: [
      "monthly basic",
      "وصول لأسهم أكثر من +300 شركة",
      "معرفة تفاصيل الشركات المدرجة في الأسهم",
      "السؤال عن أوقات التوزيعات لأي سهم",
      "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
      "تفعيل خاصية إضافة هدف لأسهمك الحالية",
      "الحصول على تقرير اسبوعي لأداء السهم PDF",
    ], annually: [
      "annually basic",
      // "وصول لأسهم أكثر من +300 شركة",
      "معرفة تفاصيل الشركات المدرجة في الأسهم",
      "السؤال عن أوقات التوزيعات لأي سهم",
      "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
      "تفعيل خاصية إضافة هدف لأسهمك الحالية",
      "الحصول على تقرير اسبوعي لأداء السهم PDF",
    ]},
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
    features: { monthly: [
      "monthly standard",
      "وصول لأسهم أكثر من +300 شركة",
      "معرفة تفاصيل الشركات المدرجة في الأسهم",
      "السؤال عن أوقات التوزيعات لأي سهم",
      "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
      "تفعيل خاصية إضافة هدف لأسهمك الحالية",
      "الحصول على تقرير اسبوعي لأداء السهم PDF",
    ], annually: [
      "annually standard",
      // "وصول لأسهم أكثر من +300 شركة",
      "معرفة تفاصيل الشركات المدرجة في الأسهم",
      "السؤال عن أوقات التوزيعات لأي سهم",
      "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
      "تفعيل خاصية إضافة هدف لأسهمك الحالية",
      "الحصول على تقرير اسبوعي لأداء السهم PDF",
    ]},
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
    features: { monthly: [
      "monthly premium",
      "وصول لأسهم أكثر من +300 شركة",
      "معرفة تفاصيل الشركات المدرجة في الأسهم",
      "السؤال عن أوقات التوزيعات لأي سهم",
      "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
      "تفعيل خاصية إضافة هدف لأسهمك الحالية",
      "الحصول على تقرير اسبوعي لأداء السهم PDF",
    ], annually: [
      "annually premium",
      // "وصول لأسهم أكثر من +300 شركة",
      "معرفة تفاصيل الشركات المدرجة في الأسهم",
      "السؤال عن أوقات التوزيعات لأي سهم",
      "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
      "تفعيل خاصية إضافة هدف لأسهمك الحالية",
      "الحصول على تقرير اسبوعي لأداء السهم PDF",
    ]},
  },
];

  return (
    <div>
        {isPricingModalOpen ? (
        <ModalUI
          onClose={() => setIsPricingModalOpen(false)}
          isOpen={isPricingModalOpen}
          onClickHandle={() => setIsPricingModalOpen(false)}
          title="ترقية الباقة"
          button="حفظ"
          content={
            <RegisterPricingModal isOpen={isPricingModalOpen} setSelectedOption={setSelectedOption} selectedOption={selectedOption} 
            frequencies={frequencies} frequency={frequency} setFrequency={setFrequency}
            pricingRadio={pricingRadio}
            />
          }
        />
      ) : (
        ""
      )}
      <div className="bg-white shadow-xl rounded-2xl pb-2 mb-1">
        <SimpleCardHeader
          title={
            <AvatarWithText
              title="باقتي"
              desc="تفاصيل ومعلومات باقتي"
              image={
                <Image
                  src="/assets/icons/golden-doc.svg"
                  height={30}
                  width={30}
                  alt="image"
                />
              }
            />
          }
          content={
            <div>
              <AvatarWithText
                title={selectedOption}
                desc={` ${selectedOption == "الباقة المتقدمة" ? pricingRadio[2].price[frequency.value] : selectedOption == "باقة بريميوم" ? pricingRadio[1].price[frequency.value] : pricingRadio[0].price[frequency.value]} / ${frequency.label} `}
                descStyle={selectedOption == "الباقة المتقدمة" ? "!text-yellowColor" : selectedOption == "باقة بريميوم" ? "!text-purpleColor" : "!text-blueColor"}
                image={
                  <Image
                    src={selectedOption == "الباقة المتقدمة" ? "/assets/icons/yellow-check.svg" : selectedOption == "باقة بريميوم" ? "/assets/icons/purple-check-icon.svg" : "/assets/icons/blue-check.svg"}
                    height={30}
                    width={30}
                    alt="image"
                  />
                }
              />
              <div className="mt-3" onClick={() => {
                setIsPricingModalOpen(true);
              }}>
                <PrimaryButton
                  button="ترقية باقتي"
                  buttonStyle="py-3 rounded-md !font-normal !bg-primaryColor/10 !text-primaryColor w-full justify-center mt-6"
                />
              </div>
              {selectedOption == "الباقة المجانية" ? "" :
              <div className="mt-3" onClick={() => {
                handlePageChange({name: "payment", value: "باقتي وحسابي" })
              }}>
                <PrimaryButton
                  button="متابعة للدفع"
                  buttonStyle="py-3 rounded-md !font-normal !bg-secondaryColor w-full justify-center mt-6"
                />
              </div>}
            </div>
          }
        />
      </div>
      <div>
        <div className="grid grid-cols-1 rounded-2xl shadow-xl space-y-4 bg-white sm:px-8 pt-5 pb-10 mt-3">
          <div className="px-6 sm:px-0">
            <AvatarWithText
              title="حسابي ومعلوماتي"
              desc="تفاصيل حسابي وباقتي"
              image={
                <Image
                  src="/assets/icons/outline-user.svg"
                  height={20}
                  width={20}
                  alt="image"
                />
              }
            />
          </div>
          <div className="px-6 sm:px-0">
            <InputFieldUI label="الاسم الأول" type="text" name="" />
          </div>
          <div className="px-6 sm:px-0">
            <InputFieldUI
              type="text"
              name=""
              label="الاسم الأخير"
              placeholder="الشهر / السنة"
            />
          </div>
          <div className="px-6 sm:px-0">
            {/* <InputFieldUI type="text" name="" label="" placeholder="رمز التحقق CVC" /> */}
            <PhoneNumberUI title="رقم الجوال" dataList={countryCodes} activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default UserProfileFeatureFour;