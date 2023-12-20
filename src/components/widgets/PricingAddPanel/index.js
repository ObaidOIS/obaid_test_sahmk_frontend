import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Feedback from "../Feedback";
import Image from "next/image";

const PricingAddPanel = ({handleFeedClick}) => {
  return (
    <div className="px-5">
      <div className=" mx-auto border-t">
        <div className="flex w-full py-6 justify-between">
          <div className="flex-1 font-medium text-sm">
            <span>قائمة أسهمي </span>
            <span className="text-gray-400">العدد ( 0 )</span>
          </div>
          <div className="flex-1 text-accentColor flex items-center justify-end text-base font-small">
            <PlusIcon
              className="h-5 w-5 text-accentColor group-hover:text-accentColor"
              aria-hidden="true"
            />
            إضافة /تعديل سهم
          </div>
        </div>
        <div className="pt-4 pb-10 px-5">
          <Feedback
            title="لم تقم بإضافة أسهم"
            icon={
              <Image
                src="/assets/icons/apps-add.svg"
                width={42}
                height={42}
                alt="img"
                className=""
              />
            }
            onClick={handleFeedClick}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingAddPanel;
