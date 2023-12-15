"use client";
import Image from "next/image";
import React, { useState } from "react";

const PhoneInput = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const phoneList = [
    { title: "1+" },
    { title: "44+" },
    { title: "33+" },
    { title: "69+" },
    { title: "88+" },
  ];

  return (
    <div className="relative">
      <label
        htmlFor="phone-input"
        className="block mb-3 ms-2 text-teal-950"
      >
        {title}
      </label>
      <div className="relative flex items-center">
        {isOpen && (
          <div
            id="dropdown-phone"
            className="absolute top-14 left-0 z-50 bg-white divide-gray-100 rounded-lg shadow w-16 transition-all duration-300 ease-in-out"
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdown-phone-button"
            >
              {phoneList.map((item, index) => {
                return (
                  <li key={index}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <div className="inline-flex items-center">{item.title}</div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="relative w-full">
          <input
            type="text"
            id="phone-input"
            className="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-0 border border-gray-200"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
        </div>
        <button
          id="dropdown-phone-button"
          onClick={toggleDropdown}
          className="flex-shrink-0 z-10 inline-flex items-center py-3 px-2 text-sm text-center text-gray-900 bg-gray-100 border border-gray-200 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
          type="button"
        >
          <Image
            src="/assets/icons/arrow-right.svg"
            height={7}
            width={7}
            className="-rotate-90 ml-3 mt-1 text-sm"
            alt="image"
          />
          966+
        </button>
      </div>
    </div>
  );
};

export default PhoneInput;
