import React, {useState} from "react";
import PricingCard from "@/components/widgets/PricingCard";
import BasicHeading from "@/components/widgets/BasicHeading";
import RadioTabs from "@/components/widgets/RadioTabs";
import { RadioGroup } from "@headlessui/react";

const PricingSection = () => {
  
  const frequencies = [
    { value: "monthly", label: "شهري", priceSuffix: "/شهري" },
    { value: "annually", label: "سنوي", priceSuffix: "/سنوي" },
  ];

  const [frequency, setFrequency] = useState(frequencies[0]);

  const tiers = [
    {
      name: "الباقة المجانية",
      id: "tier-freelancer",
      href: "/auth/register",
      price: { monthly: "49 ريال", annually: "488 ريال" },
      description: "الباقة الأساسية تستطيع من خلالها الاستعلام عن اسعار الاسهم وسعر الافتتاح والاغلاق اليومي لكل سهم",
      button: "اشترك الآن",
      features: { monthly: [
        {feature: "وصول لأسهم أكثر من +300 شركة", isAvaiable: true},
        {feature: "معرفة تفاصيل الشركات المدرجة في الأسهم", isAvaiable: true},
        {feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true},
        {feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: false},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: false},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: false},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: false},
      ], annually: [
        {feature: "معرفة تفاصيل الشركات المدرجة في الأسهم", isAvaiable: true},
        {feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true},
        {feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: false},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: false},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: false},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: false},
      ]},
      mostPopular: false,
      card: "free",
    },
    {
      name: "باقة بريميوم",
      id: "tier-startup",
      href: "/auth/register",
      price: { monthly: "49 ريال", annually: "488 ريال" },
      description: "الباقة الأساسية تستطيع من خلالها الاستعلام عن اسعار الاسهم وسعر الافتتاح والاغلاق اليومي لكل سهم",
      button: "اشترك الآن",
      features: { monthly: [
        {feature: "وصول لأسهم أكثر من +300 شركة", isAvaiable: true},
        {feature: "معرفة تفاصيل الشركات المدرجة في الأسهم", isAvaiable: true},
        {feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true},
        {feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: false},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: false},
      ], annually: [
        {feature: "معرفة تفاصيل الشركات المدرجة في الأسهم", isAvaiable: true},
        {feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true},
        {feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: true},
        {feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: false},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: false},
      ]},
      mostPopular: true,
      card: "premium",
      badge: "موصى به"
    },
    {
      name: "الباقة المتقدمة",
      id: "tier-enterprise",
      href: "/auth/register",
      price: { monthly: "49 ريال", annually: "488 ريال" },
      description: "الباقة الأساسية تستطيع من خلالها الاستعلام عن اسعار الاسهم وسعر الافتتاح والاغلاق اليومي لكل سهم",
      button: "اشترك الآن",
      features: { monthly: [
        {feature: "وصول لأسهم أكثر من +300 شركة", isAvaiable: true},
        {feature: "معرفة تفاصيل الشركات المدرجة في الأسهم", isAvaiable: true},
        {feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true},
        {feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: true},
      ], annually: [
        {feature: "معرفة تفاصيل الشركات المدرجة في الأسهم", isAvaiable: true},
        {feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true},
        {feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: true},
        {feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: true},
        {feature: "الحصول على تقرير اسبوعي لأداء السهم PDF", isAvaiable: true},
      ]},
      mostPopular: false,
      card: "advance",
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div id="pricing" className=" bg-bgColor dark:bg-darkColor py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-2xl font-bold tracking-tight text-darkColor dark:text-whiteColor  sm:text-4xl">
         اشترك الآن
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-l leading-8 text-darkColor/50 dark:text-gray-300">
        بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة 
        </p>
        <div className="mt-12 flex justify-center">
          <RadioTabs frequencies={frequencies} setFrequency={setFrequency} frequency={frequency} />
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, index) => {
            return <div key={index}><PricingCard tier={tier} frequencies={frequencies} frequency={frequency} setFrequency={setFrequency} /></div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
