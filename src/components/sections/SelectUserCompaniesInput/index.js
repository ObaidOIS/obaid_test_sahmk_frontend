"use client";
import React, { useState, useEffect, useRef } from "react";
import AddList from "@/components/widgets/AddList";
import SearchInput from "@/components/widgets/SearchInput";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import MessageAlert from "@/components/widgets/MessageAlert";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { FiSearch } from "react-icons/fi";

const SelectUserCompaniesInput = ({
  dataList,
  AddCompanySelection,
  // isOpen,
  selectedItems,
  searchQuery,
  handleSearch,
  filteredData,
  originalData,
  setErrorAlert,
  setErrorMessage,
  originalSubscriptionDetails,
  errorAlert,
  errorMessage,
  successCompaniesAlert,
  setSuccessCompaniesAlert,
  successCompaniesMessage,
  handleTagClick,
  setActiveStat,
  setSelectedSymbol,
  apiRange,
  selectedSymbol,
  stockProfileData,
  setSelectedStockProfileCurrentValue,
}) => {

  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentSelectedValue, setCurrentSelectedValue] = useState("");

  console.log(filteredData, "hello filter");

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

  return (
    <div>
      <div>
        {successCompaniesAlert == true && (
          <MessageAlert
            setOpenModal={setSuccessCompaniesAlert}
            title="نجاح"
            message={successCompaniesMessage}
            alertStyle="fixed top-5 right-2 text-primaryColor bg-teal-50 "
            icon={
              <CheckCircleIcon
                className="h-5 w-5 text-primaryColor"
                aria-hidden="true"
              />
            }
          />
        )}
        {errorAlert == true && (
          <MessageAlert
            setOpenModal={setErrorAlert}
            title="خطأ"
            message={errorMessage}
            alertStyle="fixed top-5 right-2 text-redColor bg-red-50 "
            icon={
              <XCircleIcon
                className="h-5 w-5 text-redColor"
                aria-hidden="true"
              />
            }
          />
        )}
      </div>
      {/* <div>
        {openSucessModal ? (
          <PopupModal
            onClickHandle={() => {
              setOpenSucessModal(true);
              setShowItems(selectedItems);
            }}
            onClose={() => {
              setIsPricingAddPanelOpen(false);
            }}
            image={
              <Image unoptimized={true} 
                loading="eager"
                src="/assets/icons/success-new-icon.svg"
                width={400}
                height={400}
                alt="img"
                className=""
                priority
              />
            }
            openModal={openSucessModal}
            setOpenModal={setOpenSucessModal}
            title="تم إضافة أسهمك بنجاح"
            desc="ستصلك يوميا أسعار الافتتاج والاغلاق"
          />
        ) : (
          ""
        )}
    </div> */}
      <div className="w-full relative" ref={dropdownRef}>
        <div>
          <SearchInput
            onFocus={(e) => { e.preventDefault(); dropdownOpen == false ? setDropdownOpen(!dropdownOpen) : ""}}
            onClick={() => dropdownOpen == false ? setDropdownOpen(true) : ""}
            // onBlur={() => setDropdownOpen(false)}
            // inputContainerStyle="relative"
            inputStyle="bg-white rounded-xl shadow-md py-3"
            // inputStyle={`bg-white rounded-md relative ring-brightGreyColor py-3 focus:!ring-2 focus:!ring-primaryColor`}
            placeholder={
              // selectedItems?.length > 0
              // ? `قائمة الشركات تم تحديد ( ${selectedItems?.length} )`:
              currentSelectedValue != "" && dropdownOpen == false ?
              currentSelectedValue :
              "بحث عن اسم السهم  أو رقم السهم"
            }
            icon={<FiSearch size={24} className="text-darkGreyColor/60" />}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </div>
        {dropdownOpen && (
                  <div
                    // ref={dropdownRef}
                    className="absolute top-[53px] bg-white z-40 w-full left-0 rounded-xl border shadow-xl max-h-select overflow-y-auto svelte-5uyqqj"
                  >
                    <div className=" max-h-52 overflow-y-auto flex flex-col w-full">
        {/* <div className="h-[37vh] absolute mt-1 mb-20 overflow-y-scroll bg-white rounded-xl shadow-xl"> */}
          {/* <div className=""> */}
            <ul role="list" className="grid grid-cols-1 bg-white">
              {filteredData?.length !== 0 &&
                filteredData?.map((person) => (
                  <li key={person.id}    
                  
                  onClick={() => {setDropdownOpen(false); setCurrentSelectedValue(person.name)}}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        AddCompanySelection !== undefined
                          ? (AddCompanySelection(
                              person.id,
                              person.name,
                              person.symbol,
                              person,
                              selectedItems
                            ),
                            handleTagClick(apiRange, person.symbol),
                            // setActiveStat(person.symbol),
                            setActiveStat(person.name),
                            setSelectedSymbol(person.symbol),
                            console.log(person.symbol, "stock_company from search"))
                            
                          : // ,setName(person.name))
                            null;
                      }}
                      className={`group flex w-full items-center justify-between space-x-3 border ${
                        // selectedItems?.some(
                        //   (item) => item.symbol === person.symbol
                        // )
                        // ? "border-primaryColor cursor-pointer"
                        // ? "border-primaryColor focus:ring-2 focus:ring-primaryColor focus:ring-offset-2 cursor-pointer"
                        ` cursor-pointer `
                      } p-1 text-left shadow-sm hover:bg-gray-50 focus:outline-none `}
                    >
                      <span className="flex min-w-0 flex-1 items-center space-x-3">
                        {person.imageUrl ? (
                          <span className="block flex-shrink-0">
                            <Image unoptimized={true} 
                              loading="eager"
                              width={20}
                              heiight={20}
                              alt="image"
                              className="h-10 w-10 rounded-full"
                              src={person.imageUrl}
                              priority
                            />
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="min-w-0 flex justify-end">
                          <span className="block truncate text-sm font-medium mr-6 text-gray-900">
                            {person.name}
                          </span>
                          <span className="block truncate text-sm font-medium text-gray-500">
                            {person.role}
                          </span>
                        </span>
                      </span>
                      <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                        {selectedItems?.some(
                          (item) => item.symbol === person.symbol
                        ) ? (
                          ""
                        ) : ( ""
                          // <CheckIcon
                          //   className="h-6 w-5 flex-none text-primaryColor"
                          //   aria-hidden="true"
                          // />
                          // <div>
                          //   <PlusCircleIcon
                          //     className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          //     aria-hidden="true"
                          //   />
                          // </div>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        {/* </div> */}
        </div>)}
      </div>
    </div>
  );
};

export default SelectUserCompaniesInput;
