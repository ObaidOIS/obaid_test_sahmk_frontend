import AvatarWithText from "@/components/widgets/AvatarWithText";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import PhoneNumberUI from "@/components/widgets/PhoneNumberUI";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import SimpleCardHeader from "@/components/widgets/SimpleCardHeader";
import Image from "next/image";
import React, {useState} from "react";
import RegisterPricingModal from "../RegisterPricingModal";
import ModalUI from "@/components/widgets/ModalUI";

const UserProfileFeatureFour = ({handlePageChange}) => {

const countryCodes = [
    {
      name: "Bahrain",
      dial_code: "+973",
    },
    {
      name: "Kuwait",
      dial_code: "+965",
    },
    {
      name: "Oman",
      dial_code: "+968",
    },
    {
      name: "Qatar",
      dial_code: "+974",
    },
    {
      name: "Saudi Arabia",
      dial_code: "+966",
    },
    {
      name: "UAE",
      dial_code: "+971",
    },
  ];

  const [activeItem, setActiveItem] = useState(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  return (
    <div>
        {isPricingModalOpen ? (
        <ModalUI
          onClose={() => setIsPricingModalOpen(false)}
          isOpen={isPricingModalOpen}
          title="ترقية الباقة"
          button="حفظ"
          content={
            <RegisterPricingModal isOpen={isPricingModalOpen} />
          }
        />
      ) : (
        ""
      )}
      <div className="bg-white shadow-xl rounded-2xl pb-2 mb-1">
        <SimpleCardHeader
          title={
            <AvatarWithText
              title="باقتي"
              desc="تفاصيل ومعلومات باقتي"
              image={
                <Image
                  src="/assets/icons/golden-doc.svg"
                  height={30}
                  width={30}
                  alt="image"
                />
              }
            />
          }
          content={
            <div>
              <AvatarWithText
                title="باقة بريميوم"
                desc="199 ريال/سنة"
                descStyle="text-purpleColor"
                image={
                  <Image
                    src="/assets/icons/purple-check-icon.svg"
                    height={30}
                    width={30}
                    alt="image"
                  />
                }
              />
              <div className="mt-3" onClick={() => {
                setIsPricingModalOpen(true);
              }}>
                <PrimaryButton
                  button="ترقية باقتي"
                  buttonStyle="py-3 rounded-md !font-normal !bg-primaryColor/10 !text-primaryColor w-full justify-center mt-6"
                />
              </div>
              <div className="mt-3" onClick={() => {
                handlePageChange({name: "payment", value: "باقتي وحسابي" })
              }}>
                <PrimaryButton
                  button="متابعة للدفع"
                  buttonStyle="py-3 rounded-md !font-normal !bg-secondaryColor w-full justify-center mt-6"
                />
              </div>
            </div>
          }
        />
      </div>
      <div>
        <div className="grid grid-cols-1 rounded-2xl shadow-xl space-y-4 bg-white sm:px-8 pt-5 pb-10 mt-3">
          <div className="px-6 sm:px-0">
            <AvatarWithText
              title="حسابي ومعلوماتي"
              desc="تفاصيل حسابي وباقتي"
              image={
                <Image
                  src="/assets/icons/outline-user.svg"
                  height={20}
                  width={20}
                  alt="image"
                />
              }
            />
          </div>
          <div className="px-6 sm:px-0">
            <InputFieldUI label="الاسم الأول" type="text" name="" />
          </div>
          <div className="px-6 sm:px-0">
            <InputFieldUI
              type="text"
              name=""
              label="الاسم الأخير"
              placeholder="الشهر / السنة"
            />
          </div>
          <div className="px-6 sm:px-0">
            {/* <InputFieldUI type="text" name="" label="" placeholder="رمز التحقق CVC" /> */}
            <PhoneNumberUI title="رقم الجوال" dataList={countryCodes} activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default UserProfileFeatureFour;
