import React from "react";

const DropdownUI = ({title, dataList, isOpen, handleMenuItemClick, handleToggleDropdown, activeItem, setActiveItem, setIsOpen}) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={handleToggleDropdown}
          className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {activeItem ? activeItem.dial_code : "+966"}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                className={`text-gray-700 cursor-pointer w-20 hover:bg-lightGreyColor/60 inline-block  px-4 py-2 text-sm ${
                  activeItem === item ? "bg-gray-100 text-gray-900" : ""
                }`}
                role="menuitem"
                tabIndex="-1"
                onClick={() => handleMenuItemClick(item)}
              >
                {item.dial_code}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUI;
