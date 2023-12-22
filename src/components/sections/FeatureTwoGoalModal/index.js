import InputFieldUI from "@/components/widgets/InputFieldUI";
import RadioButtonGroup from "@/components/widgets/RadioButtonGroup";
import RememberNoteUI from "@/components/widgets/RemeberNoteUI";
import SelectBoxUI from "@/components/widgets/SelectBoxUI";
import React from "react";
import Image from 'next/image'

const FeatureTwoGoalModal = ({
  options,
  isOpen,
  buttonTabs,
  activeButton,
  handleMemoryChange
}) => {
  return (
    <div className="mt-3 w-full space-y-3">
      <div className="border-b py-4">
        <RememberNoteUI 
        text="يمكنك إضافة هدف جديد للأسهم وستصلم تنبيه في حال وصول السهم للهدف المضاف"
        icon={<Image
            src="/assets/icons/hotspot-icon.svg"
            width={35}
            height={35}
            className=""
            alt="img"
          />} />
      </div>
      <SelectBoxUI options={options} title="اسم الشركة" defaultValue="ARAMCO" />
      <InputFieldUI label="السعر الحالي" placeholder="0.0" name="price" value onChange />
      <p for="text" class="block text-sm font-medium leading-6 text-gray-900">
        السعر المستهدف
      </p>
      <div className="flex gap-x-2">
        <RadioButtonGroup
          buttonTabs={buttonTabs}
          selectedMemory={activeButton} handleMemoryChange={handleMemoryChange}
        />
      </div>
      <InputFieldUI label="سعر مخصص" placeholder="23 SAR" name="goal" />
    </div>
  );
};

export default FeatureTwoGoalModal;