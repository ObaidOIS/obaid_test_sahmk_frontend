import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Feedback from "../Feedback";
import Image from "next/image";
import AddList from "../AddList";
import BasicTableUI from "../BasicTableUI";
import IconButtonUI from "../IconButtonUI";

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
  tableTitles,
  setIsSecondFeatureModalOpen,
  setFormData,
  confirmDelete,
  setWarningAlert,
  setWarningMessage,
  setCompanyToBeDeteled,
}) => {
  return (
    <div className="px-5 cursor-auto">
      <div className=" mx-auto py-6 border-t">
        <div className="flex lg:grid lg:grid-cols-2 gap-3 items-start w-full justify-between">
          <div className="flex-1 gap-x-2 font-medium text-lg">
            <span>{title}</span>
            <span className="text-gray-400 truncate">
              {" "}
              العدد ( {selectedItems?.length} ){" "}
            </span>
          </div>
          <div
            onClick={handleFeedClick}
            className="flex-1 text-primaryColor flex items-center justify-end text-base font-medium"
          >
            <IconButtonUI
              button="إضافة /تعديل سهم"
              icon={
                <PlusIcon
                  className="h-5 w-5 -mr-0.5 text-primaryColor group-hover:text-primaryColor/90"
                  aria-hidden="true"
                />
              }
              buttonStyle="text-primaryColor hover:bg-whiteColor bg-whiteColor !shadow-none"
            />
          </div>
        </div>
        <div className="pt-6">
          {feature == "first" ? (
            <div className="max-h-[660px] overflow-y-scroll">
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
              />
            </div>
          ) : (
            ""
          )}
          {feature == "second" && selectedItems?.length !== 0 ? (
            <BasicTableUI
              setWarningAlert={setWarningAlert}
              setWarningMessage={setWarningMessage}
              setIsSecondFeatureModalOpen={setIsSecondFeatureModalOpen}
              tableTitles={tableTitles}
              tableData={selectedItems}
              setFormData={setFormData}
              confirmDelete={confirmDelete}
              setCompanyToBeDeteled={setCompanyToBeDeteled}
            />
          ) : (
            ""
          )}
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
