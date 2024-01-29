import React from "react";
import { SA } from 'country-flag-icons/react/3x2'
import Image from "next/image";

const DropdownUI = ({title, dataList, isOpen, handleMenuItemClick, handleToggleDropdown, activeItem, setActiveItem, setIsOpen}) => {
  return (
    <div className="relative inline-block text-left w-24">
      <div>
        <button
          type="button"
          onClick={handleToggleDropdown}
          className={`inline-flex w-full items-center justify-center gap-1 rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 ${activeItem ? (activeItem.dial_code == "+966" ? "px-6 py-2" : "") :"px-6 py-2" }`}
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Image loading="eager"  
            src="/assets/icons/arrow-right.svg"
            height={5}
            width={5}
            className="-rotate-90 mt-1 ml-1 text-sm "
            alt="image"
            priority
          />
          {activeItem ? <> <span dir="ltr" >{activeItem.dial_code}</span> {activeItem.icon} </>: <> <span dir="ltr" >+966 </span> <Image loading="eager"   src="/assets/icons/saudi-arabia-flag.png" width="24" height="24" className="w-5 h-5" alt="Saudi Arabia" priority /> </>}
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute max-h-48 overflow-y-scroll right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {dataList.map((item, index) => (
              <span
                key={index}
                href="#"
                className={`text-gray-700 flex cursor-pointer w-24 gap-2 hover:bg-lightGreyColor/60 px-4 py-2 text-sm ${
                  activeItem === item ? "bg-gray-100 text-gray-900" : ""
                }`}
                role="menuitem"
                tabIndex="-1"
                onClick={() => handleMenuItemClick(item)}
              >
                <span dir="ltr">{item.dial_code}</span> {item.icon}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUI;
