import React from "react";

const TabSection = ({title, desc, handleTabClick, index, activeTab}) => {
  return (
    <>
      <div className=" flex justify-center">

          <input
            className="peer sr-only"
            type="radio"
            value={title}
            name="tab"
            id={index}
            checked={index == activeTab ? true : false}
          />
          <label
            onClick={()=>{handleTabClick(index)}}
            className={` peer-checked:bg-white whitespace-nowrap text-center cursor-pointer rounded-full py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:text-teal-900 text-white transition-all duration-500 ease-in-out`}
            for={index}
          >
            {title}
          </label>
          
          </div>
        </>
  );
};

export default TabSection;
