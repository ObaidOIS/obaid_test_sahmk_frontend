import React, { useState } from "react";
import IconSwitch from "@/components/widgets/IconSwitch";
import PricingAddPanel from "@/components/widgets/PricingAddPanel";
import Image from "next/image";
import ArrowList from "@/components/widgets/ArrowList";
import PopupModal from "@/components/widgets/PopupModal";
import FeatureOneSearchModal from "../FeatureOneSearchModal";
import ModalUI from "@/components/widgets/ModalUI";

const UserProfileFeatureOne = ({
  isNotificationChecked,
  handleNotificationSwitch,
  handleTvSwitch,
  isTvChecked,
}) => {
    
  const [isPricingAddPanelOpen, setIsPricingAddPanelOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openSucessModal, setOpenSucessModal] = useState(false);
  const [showItems, setShowItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const dataList = [
    { name: "الاتصالات السعودية", id:"1" },
    { name: "شركة علم", id:"2" },
    { name: "مصرف الانماء", id:"3"},
    { name: "الجزيرة", id:"4"},
    { name: "الاتصالات المتكاملة", id:"5" },
    { name: "الرياض", id:"6" },
    { name: "سابك", id:"7" },
  ];

  const [filteredData, setFilteredData] = useState(dataList);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = dataList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };


  const toggleSelection = (itemId, itemName) => {
    setSelectedItems((prevSelectedItems) => {
      // Check if the item is already selected
      const isSelected = prevSelectedItems.some((item) => item.id === itemId);

    // If selected, remove it; otherwise, add it
    if (isSelected) {
      return prevSelectedItems.filter((item) => item.id !== itemId);
    } else {
      return [...prevSelectedItems, { id: itemId, name: itemName }];
      }
    });
  };


  const removeItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item.id !== id)
    );
  };

  const handleFeedClick = () => {
    setIsPricingAddPanelOpen(true);
  };

  return (
    <div>
      {openSucessModal ? (
        <PopupModal
          onClickHandle={() => {
            setOpenSucessModal(true);
            setShowItems(selectedItems);
          }}
          onClose={() => {setIsPricingAddPanelOpen(false)}}
          image={
            <Image
              src="/assets/icons/success-new-icon.svg"
              width={400}
              height={400}
              alt="img"
              className=""
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
          onClose={() => {setIsPricingAddPanelOpen(false); setSearchQuery(""); setFilteredData(dataList); }}
          isOpen={isPricingAddPanelOpen}
          title="إضافة تعديل أسهمي"
          button="حفظ"
          content={
            <FeatureOneSearchModal
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              filteredData={filteredData}
              isOpen={isPricingAddPanelOpen}
              dataList={dataList}
              toggleSelection={toggleSelection}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
            />
          }
        />
      ) : (
        ""
      )}
      <div className="space-y-6">
        <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
          <div className="space-y-4">
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
                  src="/assets/icons/green-bell-icon.svg"
                  width={25}
                  height={25}
                  alt="img"
                  className="ml-5"
                />
              }
              isChecked={isNotificationChecked}
              addPanel={
                <PricingAddPanel
                 feature="first"
                  image={
                    <Image
                      src="/assets/icons/apps-add.svg"
                      width={42}
                      height={42}
                      alt="img"
                      className=""
                    />}
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
                  src="/assets/icons/tv-icon.svg"
                  width={25}
                  height={25}
                  alt="img"
                  className="ml-5"
                  isChecked={isTvChecked}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileFeatureOne;
