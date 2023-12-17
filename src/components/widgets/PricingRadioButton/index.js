import React from "react";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";

const PricingRadioButton = ({ title, desc, icon, price, isChecked }) => {
  return (
    <div>
      <div className="border-2 border-teal-500 rounded-lg py-3 my-4">
        <div className="px-3 pb-3 flex items-start justify-between">
          <div className="flex items-start text-right gap-4">
            {icon}
            <div>
              <p className="text-lg mb-1">{title}</p>
              <p className="text-gray-500 text-sm">{desc}</p>
              <p className=" mt-2">{price}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer align-middle text-teal-500 hover:text-teal-700">
            {isChecked ? (
              <div className="border-2 border-teal-500 rounded-full p-0.5">
                <FaCircleCheck className="text-teal-500 " size={16} />{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingRadioButton;
