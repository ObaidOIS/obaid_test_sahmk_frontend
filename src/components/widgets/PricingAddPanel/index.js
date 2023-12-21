import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Feedback from "../Feedback";
import Image from "next/image";
import AddList from "../AddList";
import BasicTableUI from "../BasicTableUI";

const PricingAddPanel = ({
  handleFeedClick,
  image,
  feedText,
  title,
  selectedItems,
  removeItem,
  setSelectedItems,
  isOpen,
  showItems,
  feature,
}) => {
  return (
    <div className="px-5">
      <div className=" mx-auto py-6 border-t">
        <div className="sm:flex grid grid-cols-1 lg:grid lg:grid-cols-2 gap-3 items-start w-full justify-between">
          <div className="flex-1 gap-x-2 font-medium text-lg">
            <span>{title}</span>
            <span className="text-gray-400 truncate"> العدد ( {selectedItems?.length} ) </span>
          </div>
          <div onClick={handleFeedClick} className="flex-1 text-accentColor flex items-center sm:justify-end text-base font-medium">
            <PlusIcon
              className="h-5 w-5 text-accentColor group-hover:text-accentColor"
              aria-hidden="true"
            />
            إضافة /تعديل سهم
          </div>
        </div>
        <div className="pt-6">
          {feature == "first" ?
           <AddList
           filteredData={selectedItems}
           setSelectedItems={setSelectedItems}
           selectedItems={selectedItems}
           removeItem={removeItem}
           isOpen={false}
           // icon={
           //   <MinusIcon
           //     className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
           //     aria-hidden="true"
           //   />
           // }
         /> : ""
          }
        {(feature == "second" && selectedItems?.length !== 0 ) ? 
        <BasicTableUI /> : ""
          }
        </div>
        {selectedItems?.length == 0 ? (
          <div className="pb-10 px-5">
            <Feedback title={feedText} icon={image} onClick={handleFeedClick} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PricingAddPanel;
