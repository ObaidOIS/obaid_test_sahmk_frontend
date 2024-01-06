import React, { useState, useEffect } from "react";
import IconSwitch from "@/components/widgets/IconSwitch";
import PricingAddPanel from "@/components/widgets/PricingAddPanel";
import Image from "next/image";
import ArrowList from "@/components/widgets/ArrowList";
import ModalUI from "@/components/widgets/ModalUI";
import PopupModal from "@/components/widgets/PopupModal";
import FeatureTwoGoalModal from "../FeatureTwoGoalModal";
import apiCall from "@/components/common/api";

const UserProfileFeatureTwo = ({
  isPricesChecked,
  handlePricesSwitch,
  setIsSecondFeatureModalOpen,
  isSecondFeatureModalOpen,
}) => {
  const [openSucessModal, setOpenSucessModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [options, setOptions] = useState([]);

  const buttonTabs = [
    { button: "-10%" },
    { button: "-5%" },
    { button: "+5%" },
    { button: "+10%" },
    { button: "سعر مخصص" },
  ];

  // Fetch companies from API and set to both dataList and originalData
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await apiCall("/api/stocks/get-stocks-list?price=yes");
      if (response.result) {
        const formattedData = response.result.map(
          ({ symbol, first_name, current_price }) => ({
            id: symbol,
            name: first_name,
            current_price: current_price,
          })
        );
        setOptions(formattedData); // Set original data here
      }
    };

    fetchCompanies();
  }, []);

  // const handleMemoryChange = (e) => {
  //   setActiveButton(e.target.value);
  // };

  const handleMemoryChange = (e) => {
    const value = e.target.value;
    setActiveButton(value); // Set which button is active

    // Retrieve current price as a number
    const currentPrice = parseFloat(formData.price);

    if (!isNaN(currentPrice)) {
      // Check if the button clicked is a percentage button
      if (value.includes("%")) {
        const percentage = parseFloat(value) / 100; // Convert "-10%" to -0.10, for example
        const newGoalPrice = currentPrice * (1 + percentage);
        setFormData((prevData) => ({
          ...prevData,
          goal: newGoalPrice.toFixed(2), // Update the goal in the state
        }));
      } else if (value === "سعر مخصص") {
        // Clear or set to custom mode
        setFormData((prevData) => ({
          ...prevData,
          goal: "", // Clear the goal or set to a default custom value
        }));
      }
    }
  };

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
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Update price when company is selected
    if (name === "company") {
      // Assuming you're using the SelectBoxUI in a controlled manner with React
      const selectedOption = e.target.options[e.target.selectedIndex];
      const price = selectedOption.getAttribute("data-price");
      if (price) {
        setFormData((prevData) => ({ ...prevData, price: price }));
      }
    }
  };

  const handleSubmit = () => {
    // e.preventDefault();
    setTableData((prevPeople) => [...prevPeople, formData]);
    setFormData({
      company: "",
      price: "",
      goal: "",
    });
  };

  const tableTitles = [
    { title: "الشركة" },
    { title: "السعر الحالي" },
    { title: "الهدف" },
    { title: "" },
  ];

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
          onClickHandle={() => {
            setOpenSucessModal(true);
            handleSubmit();
          }}
          onClose={() => setIsSecondFeatureModalOpen(false)}
          isOpen={isSecondFeatureModalOpen}
          title="إضافة هدف جديد"
          button="إضافة هدف جديد"
          content={
            <FeatureTwoGoalModal
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              formData={formData}
              options={options}
              buttonTabs={buttonTabs}
              activeButton={activeButton}
              handleMemoryChange={handleMemoryChange}
              isOpen={isSecondFeatureModalOpen}
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
                  setIsSecondFeatureModalOpen={setIsSecondFeatureModalOpen}
                  tableTitles={tableTitles}
                  feedText="لم تقم بإضافة هدف"
                  title="قائمة الأسعار المستهدفة"
                  setSelectedItems={setSelectedItems}
                  handleFeedClick={handleFeedClick}
                  selectedItems={tableData}
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
