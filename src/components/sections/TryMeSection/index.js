import LinkText from "@/components/widgets/LinkText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TryMeSection = () => {
  const data = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleLinkClick = (message) => {
    window.open(`https://wa.me/+966591254924?text=${message}`, '_blank');
  };

  const handleOpenWhatsapp = () => {
    window.open('https://wa.me/+966591254924', '_blank');
  }

  const questions = [
    {question:"كم سعر سهم الراجحي؟"},
    {question:"كم ارتفع سهم الراجحي خلال الاسبوع ؟"},
    {question:"كم توزيعات سهم جرير؟"},
    {question:"قارن بين سهم الحبيب وسهم المواساة ؟"},
    {question:"اعطني المعلومات الأساسية لسهم علم"},
    {question:"كم عدد الصفقات الآن في سهم إعمار؟"},
  ]

  return (
    <div
      id="try-us"
      className="flex items-end w-full mb-32 min-h-screen bg-white"
    >
      <div className="w-full text-gray-700 mx-6 body-font">
        <div className="container flex flex-col flex-wrap py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div className="flex-shrink-0 w-full lg:w-1/3 px-1 mx-auto md:mx-0">
            <div className="mb-3 mt-10 flex w-4/5">
              <div className="">
                <div className="text-xl text-primaryColor font-medium mb-5 leading-none">
                  جرب أسأل النظام
                </div>
                <div className="text-3xl text-black font-semibold mb-5 leading-none">
                  وصول لأسعار الأسهم ومعلومات السوق
                </div>
                <p className=" text-gray-400/80 leading-7 lg:pl-20">
                  جرب بإمكانك تجربة منصة سهمك من خلال سؤال عن الأسئلة في سوق
                  الاسهم النظام
                </p>
              </div>
            </div>
          </div>
          <div className=" justify-end mt-10 -mb-10 md:pl-20 md:mt-16 ">
            <div className="w-full">
              <nav className="mb-10 list-none grid grid-cols-6 md:gap-x-20">
                {questions.map((item, index) => (
                  <li className="my-4 cursor-pointer col-span-6 sm:col-span-3 group" key={index}>
                      <span onClick={()=>handleLinkClick(item.question)}>
                        <LinkText
                          message={item.question}
                          link="جرب الآن"
                        />
                      </span>
                  </li>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="w-full text-center">
          <div  onClick={handleOpenWhatsapp} className="bg-gray-100 px-5 cursor-pointer py-3 mx-auto inline-flex border border-gray-400 rounded-full">
            <span className="text-sm text-gray-600 font-semibold capitalize xl:text-center flex">
              {" "}
              جرب النظام الذكي على الواتساب
              <span className="text-teal-500 flex mr-2  font-bold">
                {" "}
                عيش التجربة
                <Image loading="eager"  
                  src="/assets/icons/green-right-arrow.svg"
                  width={16}
                  height={16}
                  className="mr-5"
                  alt="img"
                  priority
                />{" "}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryMeSection;
