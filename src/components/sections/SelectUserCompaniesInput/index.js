import React from "react";
import AddList from "@/components/widgets/AddList";
import SearchInput from "@/components/widgets/SearchInput";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import MessageAlert from "@/components/widgets/MessageAlert";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/20/solid";

const SelectUserCompaniesInput = ({
  dataList,
  toggleSelection,
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
}) => {

  console.log(filteredData?.length, "hello filter")
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
              <Image
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
      <div className="mt-3 w-full relative h-[48vh]">
        <div>
          <SearchInput
            inputStyle="bg-white shadow-xl relative !ring-0 py-3 focus:!ring-1 focus:!ring-primaryColor "
            placeholder={
              selectedItems?.length > 0
                ? `قائمة الشركات تم تحديد ( ${selectedItems?.length} )`
                : "بحث عن اسم السهم  أو رقم السهم"
            }
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </div>
        <div className="h-[37vh] absolute mt-1 mb-20 overflow-y-scroll bg-white rounded-xl shadow-xl">
          <div className="">
            <ul role="list" className="grid grid-cols-1 bg-white">
              {filteredData?.length !== 0 &&
                filteredData?.map((person) => (
                  <li key={person.id}>
                    <button
                      type="button"
                      onClick={() => {
                        toggleSelection !== undefined
                          ? toggleSelection(
                              person.id,
                              person.name,
                              person.symbol,
                              person,
                              selectedItems
                            )
                          : null;
                      }}
                      className={`group flex w-full items-center justify-between space-x-3 border ${
                        selectedItems?.some(
                          (item) => item.symbol === person.symbol
                        )
                          ? "border-primaryColor cursor-pointer"
                          // ? "border-primaryColor focus:ring-2 focus:ring-primaryColor focus:ring-offset-2 cursor-pointer"
                          : `border-gray-300 cursor-pointer `
                      } p-1 text-left shadow-sm hover:bg-gray-50 focus:outline-none `}
                    >
                      <span className="flex min-w-0 flex-1 items-center space-x-3">
                        {person.imageUrl ? (
                          <span className="block flex-shrink-0">
                            <Image
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
                          <CheckIcon
                            className="h-6 w-5 flex-none text-primaryColor"
                            aria-hidden="true"
                          />
                        ) : (
                          <div>
                            <PlusCircleIcon
                              className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectUserCompaniesInput;
