"use client";
import PrimaryCard from '@/components/widgets/PrimaryCard'
import TabSection from '@/components/widgets/TabSection';
import Image from 'next/image'
import React, { useState } from 'react'

const FeatureSection = () => {

    const Features = [
        {title: "استلام تنبيهات بأسعار الافتتاح والاغلاق", desc: "سيصلك من خلال أوقات الافتتاح والاغلاق  ، بيانات بأسعار الشركات المختارة في حسابك كما يمكنك التحكم بالبيانات ،إدارتها .", icon: <Image src="/assets/icons/notification.svg" width={20} height={25} className="ml-5" alt="img"/> },
        {title: "إدارة الأسعار المستهدفة", desc: "يمكنك من خلال إدارة حسابك إضافة الأسعار المستهدفة إلى حسابك ومعرفة التفاصيل .", icon: <Image src="/assets/icons/hotspot.svg" width={25} height={25} className="ml-5" alt="img"/> },
        {title: "إستلام تقرير اسبوعي لحالة أسهمك والشركات.", desc: "سيصلك من خلال أوقات الافتتاح والاغلاق  ، بيانات بأسعار الشركات المختارة في حسابك كما يمكنك التحكم بالبيانات ،إدارتها .", icon: <Image src="/assets/icons/notification.svg" width={20} height={25} className="ml-5" alt="img" /> },
    ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <section className="relative bg-gradient-to-tr from-teal-700 to-teal-500 via-teal-950 from-10% to-100% pt-20 ">
        <div className='mx-auto max-w-7xl h-[980px] lg:h-[780px] xl:h-[750px] overflow-hidden relative'>
            <div className='max-w-2xl mx-auto text-center xl:max-w-none'>
                <div className="text-3xl font-semibold text-white mb-5 leading-none">
                    كل بيانات الأسهم أصبحت أسرع وأقرب إليك</div>
                    <p className=' font-semibold text-gray-400 '>بإمكانك مع نظام سهمك الذكي الاستفسار بشكل سهل وسريع عبر الواتساب عن الأسهم وسيعطيك وسريع عبر الواتساب عن الأسهم وسيعطيك إجابات دقيقة </p>
                </div>
                <div className='mt-16 relative grid grid-cols-1 mx-auto items-center gap-y-2 pt-10 sm:gap-y-6 lg:grid-cols-12 lg:pt-0'>
                    <div className='-mx-4 absolute lg:w-[500px] lg:top-8 lg:right-[700px] lg:overflow-x-auto pb-4 sm:mx-0 overflow-visible sm:pb-0 lg:col-span-5'>
                        <div className='relative z-10 flex space-y-0 px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block '>
                            <div className='lg:hidden flex justify-center mx-auto w-screen mt-20' >
                                <div className="flex items-center !w-[650px] justify-center bg-white/10 sm:rounded-full border ">
                                    <ul className="mx-auto grid w-full sm:grid-cols-3 relative gap-x-5 px-8 py-5 ">
                                    {Features.map((item, index) => {
                                    return (
                                        <li className="" key={index}>
                                        <TabSection title={item.title} index={index} desc={item.desc} handleTabClick={handleTabClick} activeTab={activeTab} />
                                        </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        {Features.map((item, index) => {
                        return (
                        <div key={index}>
                            <div onClick={() => handleTabClick(index)} className={`${ activeTab === index ? "bg-white/10 ring-1 ring-inset ring-white/20" : ""} lg:pe-2 w-full lg:w-2/3 xl:w-full hidden lg:block hover:bg-white/10 cursor-pointer group relative rounded-full xl:ps-20 ps-3 xl:pe-14 rounded-l-xl rounded-r-none py-8`}>
                                <PrimaryCard index={index} title={item.title} desc={item.desc} icon={item.icon} />
                            </div>
                        </div>
                            );
                          })}
                        </div>
                    </div>
                    <div className='lg:col-span-7 hidden lg:flex'>
                        <Image 
                            src="/assets/images/desktop.png"
                            width={700}
                            height={800}
                            className='absolute xl:right-0 right-[-30] top-[0px]'
                            alt="img" />
                    </div>
                    <div className='col-span-12 lg:hidden flex justify-center '>
                        <Image 
                            src="/assets/images/desktop.png"
                            width={700}
                            height={800}
                            className='absolute top-64 sm:top-56'
                            alt="img" />
                    </div>
                </div>
        </div>
    </section>
  )
}

export default FeatureSection
