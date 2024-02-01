import React, { useState, useEffect } from "react";
import IconSwitch from "@/components/widgets/IconSwitch";
import PricingAddPanel from "@/components/widgets/PricingAddPanel";
import Image from "next/image";
import ArrowList from "@/components/widgets/ArrowList";
import PopupModal from "@/components/widgets/PopupModal";
import FeatureOneSearchModal from "../FeatureOneSearchModal";
import ModalUI from "@/components/widgets/ModalUI";
import apiCall from "@/components/common/api";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import { getUniqueStocksBySymbol } from "@/components/common/utils";
import MessageAlert from "@/components/widgets/MessageAlert";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
const UserProfileFeatureOne = ({
  isNotificationChecked,
  handleNotificationSwitch,
  handleTvSwitch,
  isTvChecked,
  originalSubscriptionDetails,
}) => {
  const [isPricingAddPanelOpen, setIsPricingAddPanelOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openSucessModal, setOpenSucessModal] = useState(false);
  const [showItems, setShowItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const [popupStocks, setPopupStocks] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch companies from API and set to both dataList and originalData
  const fetchStocks = async () => {
    const userStocksResponse = await apiCall("/api/stocks/");
    if (userStocksResponse.status === 200 && userStocksResponse.result) {
      const userStocks = userStocksResponse.result.stocks.map((stock) => ({
        id: stock.id,
        symbol: stock.symbol,
        target_price: stock.target_price,
        name: stock.stock_name,
        stock_price: stock.stock_price,
      }));
      // const userStocks = userStocksResponse.result.stocks.map((stock) => ({id: stock.id}));
      const uniqueUserStocks = getUniqueStocksBySymbol(userStocks);

      setSelectedItems(uniqueUserStocks);
    }

    const response = await apiCall("/api/stocks/get-stocks-list/");
    if (response.result) {
      const formattedData = response.result.map(({ symbol, first_name }) => ({
        id: symbol,
        name: first_name,
        symbol: symbol,
        stock_name: first_name,
      }));
      setFilteredData(formattedData);
      setOriginalData(formattedData); // Set original data here
    }
  };

  useEffect(() => {
    // Fetch user's stocks and available stocks
    fetchStocks();
  }, []);

  const handlePopupSave = async (stocksArray) => {
    // Define the endpoint for updating stocks
    const endpoint = "/api/stocks/bulk-update/";

    // Create the data object to send in the request
    // const requestData = {
    //   stocks: popupStocks,
    // };
    const requestData = {
      stocks: stocksArray,
    };

    // Send a POST request using your custom apiCall function
    const response = await apiCall(endpoint, "POST", requestData);

    if (response.status === 200) {
      // Handle successful response
      setSuccessAlert(true);
      setSuccessMessage(response.result.result);

      // Update formPayload.stocks by merging with popupStocks
      fetchStocks();
    } else {
      // Handle error response
      setErrorAlert(true);
      setErrorMessage(response.error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = originalData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const toggleSelection = (itemId, itemName, itemSymbol) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.some(
        (item) => item.symbol === itemSymbol
      );
      //   const isAlreadySelected = prevSelectedItems.some(
      //     (item) => item === itemObject
      // );

      let newSelectedItems;

      if (isAlreadySelected) {
        // Remove the item if it's already selected
        newSelectedItems = prevSelectedItems.filter(
          (item) => item.symbol !== itemSymbol
        );

        // Update popupStocks similarly as selectedItems
        setPopupStocks(newSelectedItems);
        handlePopupSave(newSelectedItems);
      } else {
        // Add the new item
        let isError = false;
        if (originalSubscriptionDetails?.subscriptionType == "free") {
          setErrorAlert(true);
          setErrorMessage("يرجى ترقية خطتك لإضافة الشركات");
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
          // setErrorButton("")
          isError = true;
        }
        if (
          originalSubscriptionDetails?.subscriptionType == "companies" &&
          selectedItems.length + 1 > 50
        ) {
          setErrorAlert(true);
          setErrorMessage("لا يمكن إضافة المزيد من الشركات.");
          isError = true;
        }
        if (!isError) {
          newSelectedItems = [
            ...prevSelectedItems,
            { id: itemId, name: itemName, symbol: itemSymbol },
          ];
          // Update popupStocks similarly as selectedItems
          setPopupStocks(newSelectedItems);
          handlePopupSave(newSelectedItems);
        } else {
          newSelectedItems = [
            ...prevSelectedItems,
            // { id: itemId, name: itemName, symbol: itemSymbol },
          ];
        }
      }

      // // Update popupStocks similarly as selectedItems
      // setPopupStocks(newSelectedItems);
      // handlePopupSave(newSelectedItems);

      return newSelectedItems;
    });
  };

  const removeItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.filter(
        (item) => item.id !== id
      );

      // Update popupStocks similarly as selectedItems
      setPopupStocks(newSelectedItems);
      handlePopupSave(newSelectedItems);

      return newSelectedItems;
    });
  };

  const handleFeedClick = () => {
    setIsPricingAddPanelOpen(true);
  };

  return (
    <>
      <div>
        {successAlert == true && (
          <MessageAlert
            setOpenModal={setSuccessAlert}
            title="نجاح"
            message={successMessage}
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
      <div>
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
        {isPricingAddPanelOpen ? (
          <ModalUI
            onClickHandle={() => setOpenSucessModal(true)}
            onClose={() => {
              setIsPricingAddPanelOpen(false);
              setSearchQuery("");
            }}
            isOpen={isPricingAddPanelOpen}
            title="إضافة تعديل أسهمي"
            button="حفظ"
            content={
              <FeatureOneSearchModal
                originalSubscriptionDetails={originalSubscriptionDetails}
                originalData={originalData}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                filteredData={filteredData}
                isOpen={isPricingAddPanelOpen}
                dataList={filteredData}
                toggleSelection={toggleSelection}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
                setErrorAlert={setErrorAlert}
                setErrorMessage={setErrorMessage}
              />
            }
          />
        ) : (
          ""
        )}
        <div className="space-y-6">
          <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
            <div className="space-y-4">
              <div className="px-6 sm:px-0"></div>
              <ArrowList
                leftIcon={
                  <IconSwitch
                    handleSwitch={handleNotificationSwitch}
                    isChecked={isNotificationChecked}
                  />
                }
                cardStyle="p-5"
                title=" استقبال أسعار الافتتاح والإغلاق  للشركات"
                desc="تصلك على الواتساب رسائل بسعر الافتتاح والاغلاق يوميا"
                icon={
                  <Image
                    loading="eager"
                    src="/assets/icons/green-bell-icon.svg"
                    width={25}
                    height={25}
                    alt="img"
                    className="ml-5"
                    priority
                  />
                }
                isChecked={isNotificationChecked}
                addPanel={
                  <PricingAddPanel
                    feature="first"
                    image={
                      <Image
                        loading="eager"
                        src="/assets/icons/apps-add.svg"
                        width={42}
                        height={42}
                        alt="img"
                        className=""
                        priority
                      />
                    }
                    removeItem={removeItem}
                    isOpen={isPricingAddPanelOpen}
                    feedText="لم تقم بإضافة أسهم"
                    title="قائمة أسهمي "
                    setSelectedItems={setSelectedItems}
                    handleFeedClick={handleFeedClick}
                    selectedItems={selectedItems}
                    //   showItems={showItems}
                  />
                }
                // saveButton={
                //   <PrimaryButton
                //     button="تحديث"
                //     buttonStyle="py-3 rounded-md !font-normal !bg-secondaryColor w-full justify-center mt-6"
                //     onClick={handlePopupSave}
                //   />
                // }
              />
              <ArrowList
                leftIcon={
                  <IconSwitch
                    handleSwitch={handleTvSwitch}
                    isChecked={isTvChecked}
                  />
                }
                cardStyle="p-5"
                title=" استلام ملخص السوق"
                desc="رسائل ملخص السوق العام"
                icon={
                  <Image
                    loading="eager"
                    src="/assets/icons/tv-icon.svg"
                    width={25}
                    height={25}
                    alt="img"
                    className="ml-5"
                    isChecked={isTvChecked}
                    priority
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileFeatureOne;
