import React from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";

const AllFeaturesModal = ({features, selectedOption}) => {
    
  return (
    <div>
      <ul className="list-disc">
            {/* <li className="flex items-center gap-3 mt-5">
              باقة بريميوم تتميز هذه الباقة بمزايا متكاملة
            </li> */}
            {features.map((item, index) => {
              return (
                <li
                  className="flex items-center gap-3 mt-5 text-sm"
                  key={index}
                >
                  <FaRegCircleCheck className={item.isAvaiable == true ? (selectedOption == "الباقة المتقدمة" ? "text-yellowColor" : selectedOption == "باقة بريميوم" ? "text-purpleColor" : "text-blueColor") : "text-mediumGreyColor"} size={20} />
                  <span  className={item.isAvaiable == true ? "text-darkColor" : "text-mediumGreyColor"}>{item.feature}</span>
                </li>
              );
            })}
          </ul>
    </div>
  )
}

export default AllFeaturesModal;
