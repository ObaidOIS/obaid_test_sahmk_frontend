import React from "react";

const TabSection = ({title, desc, handleTabClick, index, activeTab}) => {
  return (
    <>
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
            className={` peer-checked:bg-white flex text-center justify-center cursor-pointer rounded-full py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:text-teal-900 text-white transition-all duration-500 ease-in-out`}
            for={index}
          >
            {title}
          </label>

          <div className="absolute top-40 xs:top-36 sm:top-28 text-center sm:!w-[650px] text-white left-0 p-6 my-3 mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-0">
            {desc} 
          </div>
        </>
  );
};

export default TabSection;
