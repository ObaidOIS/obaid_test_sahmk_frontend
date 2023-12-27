import React from 'react'
import { FaRegCircleCheck } from "react-icons/fa6";

const AllFeaturesModal = ({features}) => {
    
  return (
    <div>
      <ul className="list-disc">
            {/* <li className="flex items-center gap-3 mt-5">
              باقة البريميوم تتميز هذه الباقة بمزايا متكاملة
            </li> */}
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
          </ul>
    </div>
  )
}

export default AllFeaturesModal;
