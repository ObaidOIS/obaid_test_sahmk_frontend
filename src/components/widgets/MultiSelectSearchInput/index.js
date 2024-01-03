"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

const MultiSelectSearchInput = ({ setUserData }) => {
  const dataList = [
    { id: 1, name: "کمپنی ایک" },
    { id: 2, name: "کمپنی دو" },
    { id: 3, name: "کمپنی تیسری" },
    { id: 4, name: "الشركة الرابعة" },
  ];

  const dropdownRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredData, setFilteredData] = useState(dataList);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Update the selectedCompanies field in userData
    setUserData((prevData) => ({
      ...prevData, // Preserve other userData fields
      // If selectedItems is empty, set selectedCompanies to an empty array
      // Otherwise, map over selectedItems to get the corresponding objects from dataList
      selectedCompanies:
        selectedItems.length === 0
          ? []
          : selectedItems
              .map((id) => dataList.find((item) => item.id === id))
              .filter((item) => item !== undefined),
    }));
  }, [selectedItems]); // Only re-run the effect if selectedItems changes

  const toggleSelection = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = dataList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const placeholderText = dropdownOpen
    ? ""
    : `قائمة الشركات تم تحديد (${selectedItems.length})`;

  const inputText = dropdownOpen ? searchQuery : "";

  return (
    <div className="w-full flex flex-col items-center mx-auto relative">
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full svelte-1l8159u">
            <label
              htmlFor="company"
              className="block mb-4 text-sm font-medium leading-6 text-gray-900"
            >
              تفعيل الشركات{" "}
            </label>
            <div className="my-2 p-1 flex border border-mediumGreyColor bg-white rounded-md shadow-sm svelte-1l8159u">
              <div className="flex flex-auto flex-wrap relative w-full">
                <input
                  placeholder={placeholderText}
                  id="company"
                  value={inputText}
                  className="bg-transparent placeholder-primaryColor py-4 px-2 appearance-none outline-none h-full w-full text-gray-800"
                  onFocus={() => setDropdownOpen(!dropdownOpen)}
                  onClick={() => setDropdownOpen(true)}
                  // onBlur={() => setDropdownOpen(false)}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute shadow top-[65px] bg-white z-40 w-full left-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
                  >
                    <div className="flex flex-col w-full">
                      {filteredData.map((item) => (
                        <div
                          key={item.id}
                          className={`cursor-pointer w-full border-gray-100 ${
                            selectedItems.includes(item.id)
                              ? "bg-lightGreyColor/20 border-lightGreyColor"
                              : ""
                          } border-b hover:bg-lightGreyColor/40`}
                          onClick={() => toggleSelection(item.id)}
                        >
                          <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                            <div className="w-full items-center flex">
                              <div className="mx-2 leading-6">{item.name}</div>
                            </div>
                            {selectedItems.includes(item.id) && (
                              <div>
                                <CheckIcon
                                  className="h-6 w-5 flex-none text-primaryColor"
                                  aria-hidden="true"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 flex items-center border-gray-200 svelte-1l8159u">
                <button
                  className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  {dropdownOpen == true ? (
                    <Image
                      src="/assets/icons/arrow-right.svg"
                      height={5}
                      width={5}
                      className="rotate-90 mt-1 ml-1 text-sm"
                      alt="image"
                    />
                  ) : (
                    <Image
                      src="/assets/icons/arrow-right.svg"
                      height={5}
                      width={5}
                      className="-rotate-90 mt-1 ml-1 text-sm"
                      alt="image"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectSearchInput;
