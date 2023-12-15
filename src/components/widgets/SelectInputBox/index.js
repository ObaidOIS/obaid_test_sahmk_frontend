"use client";
import React, { useState } from "react";
import Image from "next/image";

const SelectInputBox = ({ title, list, name, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedOption);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle selecting an item
  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div>
      <label for="countries" className="block mb-3 ms-2 ">
        {title}
      </label>
      <div x-data="select" className="relative">
        <button
          onClick={toggleDropdown}
          className=" focus:ring-teal-500 p-6 flex w-full items-center justify-between rounded-md bg-gray-50  ring-1 ring-gray-300/80"
        >
          <span>
            {" "}
            {selectedItem == "" ? (
              <span>
                قائمة الشركات{"  "}
                <span className="text-teal-500 mx-2"> تم تحديد (0) </span>
              </span>
            ) : (
              selectedItem
            )}
          </span>

          <Image
            src="/assets/icons/arrow-right.svg"
            height={7}
            width={7}
            className="-rotate-90 ml-3 mt-1"
            alt="image"
          />
        </button>
        {isOpen && (
          <ul className="z-2 absolute mt-1 w-full rounded bg-white ring-1 ring-gray-300">
            {list.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleSelect(item.title)}
                  className="cursor-pointer p-2 text-sm hover:bg-gray-100  px-6"
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectInputBox;
