import Image from "next/image";
import React from "react";

const ArrowList = ({
  title,
  desc,
  icon,
  cardStyle,
  leftIcon,
  addPanel,
  isChecked,
  saveButton,
}) => {
  return (
    <div className="group mx-auto cursor-pointer">
      <div className="bg-whiteColor rounded-xl shadow-lg  hover:shadow-2xl ">
        <ul>
          <li
            className={`group flex items-center cursor-default rounded-xl ${cardStyle}`}
          >
            {icon}
            <div className="pe-4 ml-4 flex-auto">
              <p className="font-medium text-gray-700">{title}</p>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <div className="inline-flex items-centertext-gray-900">
              {leftIcon}
            </div>
          </li>
        </ul>
        {isChecked == true ? <div>{addPanel}</div> : ""}
        {isChecked == true ? <div>{saveButton}</div> : ""}
      </div>
    </div>
  );
};

export default ArrowList;
