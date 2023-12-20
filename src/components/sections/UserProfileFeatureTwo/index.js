import React, { useState } from "react";
import IconSwitch from "@/components/widgets/IconSwitch";
import PricingAddPanel from "@/components/widgets/PricingAddPanel";
import Image from "next/image";
import ArrowList from "@/components/widgets/ArrowList";
import ModalUI from "@/components/widgets/ModalUI";
import PopupModal from "@/components/widgets/PopupModal";
import FeatureTwoGoalModal from "../FeatureTwoGoalModal";

const UserProfileFeatureTwo = ({
  isPricesChecked,
  handlePricesSwitch,
  setIsSecondFeatureModalOpen,
  isSecondFeatureModalOpen,
}) => {
  const [openSucessModal, setOpenSucessModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeButton, setActiveButton] = useState("");

  const options = [
    "ARAMCO",
    "United States",
    "Canada",
    "Mexico",
  ]
  const buttonTabs = [
    {button:"-10%"},
    {button:"-5%"},
    {button:"+5%"},
    {button:"+10%"},
    {button:"سعر مخصص"},
  ]

  const handleMemoryChange = (e) => {
    setActiveButton(e.target.value)
  }

  const handleFeedClick = () => {
    setIsSecondFeatureModalOpen(true);
  };

  const [formData, setFormData] = useState({
    company: "",
    price: "",
    goal: "",
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { company, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [company]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData((prevPeople) => [...prevPeople, formData]);
    setFormData({
        company: "",
        price: "",
        goal: "",
    });
  };
  return (
    <div>
      {openSucessModal ? (
        <PopupModal
          onClickHandle={() => {
            setIsSecondFeatureModalOpen(false);
            setOpenSucessModal(true);
          }}
          openModal={openSucessModal} 
          setOpenModal={setOpenSucessModal}
          onClose={() => setIsSecondFeatureModalOpen(false)}
          image={
            <Image
              src="/assets/icons/success-2-icon.svg"
              width={400}
              height={400}
              alt="img"
              className=""
            />
          }
          title="تم إضافة الهدف بنجاح"
          desc="ستصلك يوميا أسعار الافتتاج والاغلاق"
        />
      ) : (
        ""
      )}
      {isSecondFeatureModalOpen ? (
        <ModalUI
          onClickHandle={() => setOpenSucessModal(true)}
          onClose={() => setIsSecondFeatureModalOpen(false)}
          isOpen={isSecondFeatureModalOpen}
          title="إضافة هدف جديد"
          button="إضافة هدف جديد"
          content={
            <FeatureTwoGoalModal
              options={options}
              buttonTabs={buttonTabs}
              activeButton={activeButton}
              handleMemoryChange={handleMemoryChange}
              isOpen={isSecondFeatureModalOpen}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
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
                  handleSwitch={handlePricesSwitch}
                  isChecked={isPricesChecked}
                />
              }
              cardStyle="p-5"
              title="الأسعار المستهدفة للأسهم"
              desc="تصلك على الواتساب رسائل بسعر الافتتاح والاغلاق يوميا"
              icon={
                <Image
                  src="/assets/icons/target-price-icon.svg"
                  width={25}
                  height={25}
                  alt="img"
                  className="ml-5"
                />
              }
              isChecked={isPricesChecked}
              addPanel={
                <PricingAddPanel
                  feature="second"
                  image={
                    <Image
                      src="/assets/icons/target-secondary-icon.svg"
                      width={42}
                      height={42}
                      alt="img"
                      className=""
                    />
                  }
                  feedText="لم تقم بإضافة هدف"
                  title="قائمة الأسعار المستهدفة"
                  setSelectedItems={setSelectedItems}
                  handleFeedClick={handleFeedClick}
                  selectedItems={selectedItems}
                  tableData={tableData}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileFeatureTwo;
