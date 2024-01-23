import BasicCard from "@/components/widgets/BasicCard";
import BasicHeading from "@/components/widgets/BasicHeading";
import Image from "next/image";
import React from "react";

const ServiceSection = () => {
  const services = [
    {
      title: " الوصول  للأسعار المباشر عن طريق الواتساب",
      icon: <Image loading="eager"   src="/assets/icons/24hours.svg" width={70} height={70} alt="img" className="-mr-4" priority />,
      desc: "بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة ",
    },
    {
      title: "معرفة القوائم المالية للشركات",
      icon: <Image loading="eager"   src="/assets/icons/alert.svg" width={70} height={70} alt="img" className="-mr-4" priority />,
      desc: "بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة ",
    },
    {
      title: "استقبال اشعارات اسعار الافتتاح والاغلاق اليومي",
      icon: <Image loading="eager"   src="/assets/icons/teal-notification.svg" width={70} height={70} alt="img" className="-mr-4" priority />,
      desc: "بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة ",
    },
    {
      title: "إستلام تقارير اسبوعية لأداء أسهمك",
      icon: <Image loading="eager"   src="/assets/icons/chart-icon.svg" width={70} height={70} alt="img" className="-mr-4" priority />,
      desc: "بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة ",
    },
    {
      title: "تفعيل خاصية ارتفاع عدد الصفقات المفاجئ",
      icon: <Image loading="eager"   src="/assets/icons/money-icon.svg" width={70} height={70} alt="img" className="-mr-4" priority />,
      desc: "بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة ",
    },
    {
      title: "السؤال عن ملخص السوق يوميا",
      icon: <Image loading="eager"   src="/assets/icons/document.svg" width={70} height={70} alt="img" className="-mr-4" priority />,
      desc: "بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة ",
    },
  ];

  return (
    <div id="services" className="mb-20 mx-8 pt-16 mt-4">
      <BasicHeading heading="مميزات منصة سهمك " desc="بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة " />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6">
      {services.map((item, index) => {
        return (
        <div key={index}>
          <BasicCard
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            />
            </div>
            
            );
        })}
      </div>
    </div>
  );
};

export default ServiceSection;
