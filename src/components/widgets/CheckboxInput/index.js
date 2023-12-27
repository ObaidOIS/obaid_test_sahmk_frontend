import React from "react";
import MainBadge from "@/components/widgets/MainBadge";
import { CgCheck } from "react-icons/cg";

const CheckboxInput = ({title, desc, badge}) => {
  return (
    <div className="flex">
      <label className="inline-flex items-start mt-3">
      <div className="flex relative cursor-pointer rounded py-5">

        <input type="checkbox" 
        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded border border-gray-800 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primaryColor checked:bg-primaryColor checked:before:bg-primaryColor hover:before:opacity-10"
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
        <CgCheck />
      </div>
      </div>
        <div>
          <div className="sm:flex items-center">
            <div className="leading-none mx-2 my-4">
                {title}
            </div>
             {badge == "" ? "" :
            <MainBadge
              title={badge}
              badgeStyle="bg-amber-100 text-amber-600 text-sm px-3 py-1 "
            /> }
          </div>
        <div className="ml-2 text-sm text-gray-400 mx-2">{desc}</div>
        </div>
      </label>
      
    </div>
  );
};

export default CheckboxInput;
