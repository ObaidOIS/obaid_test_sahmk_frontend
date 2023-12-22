import React from "react";
import AddList from "@/components/widgets/AddList";
import SearchInput from "@/components/widgets/SearchInput";
import { PlusIcon } from "@heroicons/react/20/solid";

const FeatureOneSearchModal = ({
  dataList,
  toggleSelection,
  isOpen,
  selectedItems,
  searchQuery,
  handleSearch,
  filteredData,
}) => {
  return (
    <div>
      <div className="mt-3 w-full">
        <div>
          <SearchInput 
              searchQuery={searchQuery}
              handleSearch={handleSearch}/>
        </div>
        <div>
          <div className="flex-1 mt-3 font-medium text-lg">
            <span>قائمة الشركات </span>
            <span className="text-primaryColor">تم تحديد ( {selectedItems?.length} )</span>
          </div>
        </div>
        <AddList
          filteredData={filteredData}
          dataList={dataList}
          toggleSelection={toggleSelection}
          selectedItems={selectedItems}
          isOpen={isOpen}
          icon={
            <PlusIcon
              className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          }
        />
      </div>
    </div>
  );
};

export default FeatureOneSearchModal;
