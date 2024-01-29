import React, { useState } from "react";
import Image from "next/image";
import { CheckIcon } from "@heroicons/react/20/solid";

const AddList = ({ dataList, filteredData, toggleSelection, selectedItems, icon, isOpen, removeItem, originalSubscriptionDetails, setErrorAlert, setErrorMessage }) => {

  const [personIdx, setPersonIdx] = useState("")

  console.log(selectedItems, "originalData");
  return (
    <div>
      <ul role="list" className="mt-4 grid grid-cols-1 gap-4">
        {filteredData?.length !== 0  &&
        filteredData?.map((person, personIdx) => (
          <li key={person.id}>
            <button
              type="button"
              // onClick={() => {originalSubscriptionDetails?.subscriptionType == "free" ? "set error please upgrade your plan to select companies" : (originalSubscriptionDetails?.subscriptionType == "premium" && selectedItems >= 10) ? "can’t add more please upgrade your plane to add 50 companies" : (originalSubscriptionDetails?.subscriptionType == "advance" && selectedItems >= 50) ? "can’t add more companies" : setPersonIdx(person); toggleSelection !== undefined ? toggleSelection(person.id, person.name, person.symbol) : null}}
              // onClick={() => {handleCheck(person.id, person.name, person.symbol, person, selectedItems)}}
              onClick={()=>{setPersonIdx(person); toggleSelection !== undefined ? toggleSelection(person.id, person.name, person.symbol, person, selectedItems) : null}}
              className={`group flex w-full items-center justify-between space-x-3 rounded-full border ${
                (isOpen == true && selectedItems?.some(item => item.symbol === person.symbol)) ? 
                  "border-primaryColor focus:ring-2 focus:ring-primaryColor focus:ring-offset-2 cursor-pointer"
                  : `border-gray-300 ${isOpen == true ? "cursor-pointer" : " cursor-auto"} `
              } p-1 text-left shadow-sm hover:bg-gray-50 focus:outline-none `}
            >
              <span className="flex min-w-0 flex-1 items-center space-x-3">
                {person.imageUrl ? (
                  <span className="block flex-shrink-0">
                    <Image loading="eager"  
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
                { selectedItems?.some(item => item.symbol === person.symbol) ? (
                  isOpen ? <CheckIcon
                    className="h-6 w-5 flex-none text-primaryColor"
                    aria-hidden="true"
                  /> : <div>{icon}</div>
                ) : (
                  <div 
                  onClick={()=>removeItem(person.id)}
                  >{icon}</div>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {/* <ul role="list" className="mt-4 grid grid-cols-1 gap-4">
        {filteredData?.length !== 0  &&
        filteredData?.map((person, personIdx) => (
          <li key={personIdx}>
            <button
              type="button"
              onClick={() => {setPersonIdx(person); toggleSelection !== undefined ? toggleSelection(personIdx, person.name, person.symbol) : null}}
              className={`group flex w-full items-center justify-between space-x-3 rounded-full border ${
                (isOpen == true && selectedItems?.some(item => item.id === personIdx)) ? 
                  "border-primaryColor focus:ring-2 focus:ring-primaryColor focus:ring-offset-2 cursor-pointer"
                  : `border-gray-300 ${isOpen == true ? "cursor-pointer" : " cursor-auto"} `
              } p-1 text-left shadow-sm hover:bg-gray-50 focus:outline-none `}
            >
              <span className="flex min-w-0 flex-1 items-center space-x-3">
                {person.imageUrl ? (
                  <span className="block flex-shrink-0">
                    <Image loading="eager"  
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
                { selectedItems?.some(item => item.id === personIdx) ? (
                  isOpen ? <CheckIcon
                    className="h-6 w-5 flex-none text-primaryColor"
                    aria-hidden="true"
                  /> : <div>{icon}</div>
                ) : (
                  <div 
                  onClick={()=>removeItem(personIdx)}
                  >{icon}</div>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default AddList;
