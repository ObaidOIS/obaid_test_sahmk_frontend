import React from "react";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import AvatarWithText from "@/components/widgets/AvatarWithText";

const PrimaryPackageCard = ({ setIsPricingModalOpen, setIsAllFeaturesModalOpen}) => {
  const features = [
    { title: "وصول لأسهم أكثر من +300 شركة" },
    { title: "معرفة تفاصيل الشركات المدرجة في الأسهم" },
    { title: "السؤال عن أوقات التوزيعات لأي سهم" },
  ];

  return (
    <div>
      <div className=" rounded-lg">
        <div className="border-b">
          <div className="px-6 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AvatarWithText
                title="باقة بريميوم"
                desc="199 ريال/سنة"
                descStyle="text-purpleColor"
                image={
                  <Image
                    src="/assets/icons/purple-check-icon.svg"
                    height={30}
                    width={30}
                    alt="image"
                  />
                }
              />
            </div>

            <div
              onClick={() => {
                setIsPricingModalOpen(true);
              }}
              className="flex items-center gap-2 cursor-pointer align-middle text-primaryColor hover:text-primaryColor/70"
            >
              <span>تغيير الباقة</span>
              <IoIosArrowRoundBack size={24} />
            </div>
          </div>
        </div>
        <div>
          <ul className="list-disc pr-6">
            <li className="flex items-center gap-3 mt-5">
              باقة البريميوم تتميز هذه الباقة بمزايا متكاملة
            </li>
            {features.map((item, index) => {
              return (
                <li
                  className="flex items-center gap-3 mt-5 text-sm"
                  key={index}
                >
                  <FaRegCircleCheck className="text-indigo-600" size={20} />
                  <span>{item.title}</span>
                </li>
              );
            })}
            <li onClick={() => {
                setIsAllFeaturesModalOpen(true);
              }} className="flex items-center gap-3 mt-5 cursor-pointer text-primaryColor hover:text-primaryColor/70">
              شاهد كل المزايا
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrimaryPackageCard;
