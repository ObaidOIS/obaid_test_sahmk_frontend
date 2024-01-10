import React from "react";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import AvatarWithText from "@/components/widgets/AvatarWithText";
import {pricing} from "@/components/common/pricing";  

const PrimaryPackageCard = ({ setIsPricingModalOpen, setIsAllFeaturesModalOpen, features, selectedOption, pricingRadio, frequency}) => {

  console.log(selectedOption, "hi");

  return (
    <div>
      <div className=" rounded-lg">
        <div className="border-b">
          <div className="px-6 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
            <AvatarWithText
            title={selectedOption}
                desc={` ${selectedOption == "الباقة المتقدمة" ? pricing.pricing.companies[frequency?.value] : selectedOption == "باقة بريميوم" ? pricing.pricing.premium[frequency?.value] : pricing.pricing.free[frequency.value]} / ${frequency.label} `}
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
              {/* <AvatarWithText
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
              /> */}
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
            باقة بريميوم تتميز هذه الباقة بمزايا متكاملة
            </li>
            {features.slice(0, 3).map((item, index) => {
              return (
                <li
                  className="flex items-center gap-3 mt-5 text-sm"
                  key={index}
                >
                  <FaRegCircleCheck className={selectedOption == "الباقة المتقدمة" ? "text-yellowColor" : selectedOption == "باقة بريميوم" ? "text-purpleColor" : "text-blueColor"} size={20} />
                  <span>{item.feature}</span>
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
