"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import apiCall from "@/components/common/api";

const MultiSelectSearchInput = ({
  setUserData,
  selectedOption,
  setSelectedItems,
  selectedItems,
  filteredData,
  setFilteredData,
  originalData,
  setOriginalData,
  setErrorAlert,
  setErrorMessage,
  setErrorButton,
}) => {

  const dropdownRef = useRef(null);
  // const [selectedItems, setSelectedItems] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [originalData, setOriginalData] = useState([]);

  // Fetch companies from API and set to both dataList and originalData
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await apiCall("/api/stocks/get-stocks-list/");
      if (response.result) {
        const formattedData = response.result.map(({ symbol, first_name }) => ({
          id: symbol,
          name: first_name,
        }));
        setFilteredData(formattedData);
        setOriginalData(formattedData); // Set original data here
      }
    };

    fetchCompanies();
  }, []);

  // Update to only fix the symbols list in the setUserData function
  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      selectedCompanies: selectedItems,
    }));
  }, [selectedItems]);

  const toggleSelection = (itemId) => {
    if (selectedOption === "الباقة المتقدمة") {
      if(!(selectedItems.includes(itemId))){
      selectedItems.length < 50 ? "" : setErrorAlert(true); setErrorMessage("لا يمكن إضافة المزيد من الشركات."); setErrorButton("خطة التغيير");
      }
      setSelectedItems((prevSelected) =>
        prevSelected.includes(itemId)
          ? prevSelected.filter((id) => id !== itemId)
          : selectedItems.length < 50
          ? [...prevSelected, itemId]
          : [...prevSelected]
      );
    }
    if (selectedOption === "باقة بريميوم") {
      if(!(selectedItems.includes(itemId))){
      selectedItems.length < 10 ? "" : setErrorAlert(true); setErrorMessage("لا يمكن إضافة المزيد، يرجى ترقية خطتك لإضافة 50 شركة."); setErrorButton("خطة التغيير");}
      setSelectedItems((prevSelected) =>
        prevSelected.includes(itemId)
          ? prevSelected.filter((id) => id !== itemId)
          : selectedItems.length < 10
          ? [...prevSelected, itemId]
          : [...prevSelected]
          // : ([...prevSelected], setErrorAlert(true), setErrorMessage("premium reach its limit"))
      );
    }
    if (selectedOption === "الباقة المجانية") {
      setSelectedItems((prevSelected) =>
        prevSelected.includes(itemId)
          ? prevSelected.filter((id) => id !== itemId)
          : selectedItems.length < 0
          ? [...prevSelected, itemId]
          : [...prevSelected]
          // : ([...prevSelected], setErrorAlert(true), setErrorMessage("companies reach its limit"))
      );
    }
  };

  // Updated handleSearch function to filter by symbol and name using originalData
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = originalData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(query.toLowerCase())
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

  const CheckPlanError = () => {
    
    if (originalSubscriptionDetails?.subscriptionType == "free") {
      setErrorAlert(true);
      setErrorMessage("يرجى ترقية خطتك لإضافة الشركات");
      setErrorButton("خطة التغيير")
      isError = true;
    }
    if (
      originalSubscriptionDetails?.subscriptionType == "premium" &&
      selectedItems.length + 1 > 10
    ) {
      setErrorAlert(true);
      setErrorMessage(
        "لا يمكن إضافة المزيد، يرجى ترقية خطتك لإضافة 50 شركة."
      );
      setErrorButton("خطة التغيير")
      isError = true;
    }
    if (
      originalSubscriptionDetails?.subscriptionType == "companies" &&
      selectedItems.length + 1 > 50
    ) {
      setErrorAlert(true);
      setErrorMessage("لا يمكن إضافة المزيد من الشركات.");
      setErrorButton("خطة التغيير")
      isError = true;
    }
  }

  return (
    <div className="w-full flex flex-col items-center mx-auto relative">
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full svelte-1l8159u">
            <label
              // htmlFor="company"
              className="block mb-4 text-sm font-medium leading-6 text-gray-900"
            >
              تفعيل الشركات{" "}
            </label>
            <div className={`my-2 p-1 flex border bg-white rounded-md shadow-sm svelte-1l8159u ${dropdownOpen ? "border-2 border-primaryColor" : "border-mediumGreyColor"}`}>
              <div className="flex flex-auto flex-wrap relative w-full">
                <input
                  placeholder={placeholderText}
                  id="company"
                  value={inputText}
                  // disabled={selectedOption === "الباقة المجانية" ? true : false}
                  className={`bg-transparent placeholder-primaryColor py-4 px-2 appearance-none outline-none h-full w-full text-gray-800`}
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
                    <div className=" max-h-52 overflow-y-auto flex flex-col w-full">
                      {filteredData.map((item, index) => (
                        <div
                          key={item.id}
                          className={`cursor-pointer w-full border-gray-100 ${
                            selectedItems.includes(item.id)
                              ? "bg-lightGreyColor/20 border-lightGreyColor"
                              : ""
                          }  hover:bg-lightGreyColor/40`}
                          onClick={() => {
                            toggleSelection(item.id);
                            selectedOption === "الباقة المجانية" ? (setErrorAlert(true), setErrorMessage("الخطة المجانية لا يمكنها إضافة أي شركات."), setErrorButton("خطة التغيير")) : "";
                            // setDropdownOpen(false);
                          }}
                        >
                          <div className={`flex w-full items-center p-2 pl-2 border-b border relative ${selectedItems.includes(item.id) ? "border-primaryColor" : "border-t-transparent border-x-transparent"}`}>
                            <div className="w-full items-center flex">
                              <div className="mx-2 leading-6">{item.name}</div>
                            </div>
                            {selectedItems.includes(item.id) && (
                              <div>
                                <CheckIcon
                                  className="h-6 w-5 flex-none text-primaryColor"
                                  aria-hidden="true"
                                />
                                {/* {index} */}
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
                  type="button"
                  className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  onClick={() =>
                    // selectedOption === "الباقة المجانية"
                    //   ? ""
                    //   : 
                      setDropdownOpen((prev) => !prev)
                  }
                >
                  {dropdownOpen == true ? (
                    <Image unoptimized={true}  loading="eager"  
                      src="/assets/icons/arrow-right.svg"
                      height={5}
                      width={5}
                      className="rotate-90 mt-1 ml-1 text-sm"
                      alt="image"
                      priority
                    />
                  ) : (
                    <Image unoptimized={true}  loading="eager"  
                      src="/assets/icons/arrow-right.svg"
                      height={5}
                      width={5}
                      className="-rotate-90 mt-1 ml-1 text-sm"
                      alt="image"
                      priority
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
