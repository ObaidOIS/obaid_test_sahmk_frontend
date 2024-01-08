import InputFieldUI from "@/components/widgets/InputFieldUI";
import RadioButtonGroup from "@/components/widgets/RadioButtonGroup";
import RememberNoteUI from "@/components/widgets/RemeberNoteUI";
import SelectBoxUI from "@/components/widgets/SelectBoxUI";
import React from "react";
import Image from "next/image";

const FeatureTwoGoalModal = ({
  options,
  isOpen,
  buttonTabs,
  activeButton,
  handleMemoryChange,
  handleChange,
  handleSubmit,
  formData,
}) => {
  return (
    <div className="mt-3 w-full space-y-3">
      <div className="border-b py-4">
        <RememberNoteUI
          text="يمكنك إضافة هدف جديد للأسهم وستصلم تنبيه في حال وصول السهم للهدف المضاف"
          icon={
            <Image
              src="/assets/icons/hotspot-icon.svg"
              width={35}
              height={35}
              className=""
              alt="img"
            />
          }
        />
      </div>
      <SelectBoxUI
        handleChange={handleChange}
        value={formData.name}
        name="name"
        options={options}
        title="اسم الشركة"
        defaultValue=""
      />
      <InputFieldUI
        value={formData.stock_price}
        label="السعر الحالي"
        placeholder="0.0"
        name="stock_price"
      />
      <p className="block text-sm font-medium leading-6 text-gray-900">
        السعر المستهدف
      </p>
      <div className="flex gap-x-2">
        <RadioButtonGroup
          handleChange={handleChange}
          buttonTabs={buttonTabs}
          selectedMemory={activeButton}
          handleMemoryChange={handleMemoryChange}
        />
      </div>
      <InputFieldUI
        handleChange={handleChange}
        label="سعر مخصص"
        value={formData.target_price}
        placeholder="23 SAR"
        name="target_price"
      />
    </div>
  );
};

export default FeatureTwoGoalModal;
