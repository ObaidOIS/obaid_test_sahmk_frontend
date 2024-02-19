import InputFieldUI from "@/components/widgets/InputFieldUI";
import RadioButtonGroup from "@/components/widgets/RadioButtonGroup";
import RememberNoteUI from "@/components/widgets/RemeberNoteUI";
import React from "react";
import Image from "next/image";
import SelectSearchInput from "@/components/widgets/SelectSearchInput";

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
            <Image unoptimized={true}  loading="eager"  
              src="/assets/icons/hotspot-icon.svg"
              width={35}
              height={35}
              className=""
              alt="img"
              priority
            />
          }
        />
      </div>
      <SelectSearchInput 
        handleChange={handleChange}
        value={formData.name}
        name="name"
        options={options}
        title="اسم الشركة"
        defaultValue=""/>
        
      <InputFieldUI
        type="text"
        value={formData.stock_price}
        handleChange={handleChange}
        label="السعر الحالي" 
        disabled={true}
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
        type="text"
        handleChange={handleChange}
        label="سعر مخصص"
        value={formData.target_price}
        placeholder="50 ريال"
        name="target_price"
      />
    </div>
  );
};

export default FeatureTwoGoalModal;
