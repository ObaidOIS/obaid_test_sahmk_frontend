"use client";
import React, { useState } from "react";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import PrimaryPackageCard from "../PrimaryPackageCard";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import AlertButtonsModal from "@/components/widgets/AlertButtonsModal";
import SimpleCardHeader from "@/components/widgets/SimpleCardHeader";
import StackedRadioCard from "@/components/widgets/StackedRadioCard";
import AvatarWithText from "@/components/widgets/AvatarWithText";

const OrderSummaryForm = () => {
  const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState(false);
  const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false);

  const cards = [
    {
      card: (
        <Image
          src="/assets/icons/madi-mada-card.svg"
          height={150}
          width={150}
          alt="image"
        />
      ),
      name: "madi-card",
    },
    {
      card: (
        <Image
          src="/assets/icons/visa-card.svg"
          height={150}
          width={150}
          alt="image"
        />
      ),
      name: "visa-card",
    },
  ];

  const [selectedCard, setSelectedCard] = useState("");

  const handleSelectedCardChange = (value) => {
    setSelectedCard(value);
  };

  return (
    <>
      {isAlertSuccessOpen ? (
        <AlertButtonsModal
          onClose={() => setIsAlertSuccessOpen(false)}
          isOpen={isAlertSuccessOpen}
          setIsOpen={setIsAlertSuccessOpen}
          title="تم الاشتراك بنجاح"
          buttonOne="إدارة حسابي"
          image={<Image
            src="/assets/icons/alert-payment-success.svg"
            height={220}
            width={220}
            alt="image"
          />}
          messageTitle="تم تفعيل باقتك بنجاح 🎉" 
          messageDesc="يمكنك  الاستفادة من جميع خدمات سهمك" 
          buttonTwo="ابدأ بمراسلة النظام الذكي" 
          buttonIcon={<Image
            src="/assets/icons/green-right-arrow.svg"
            height={15}
            width={15}
            alt="image"
          />} 
          actionButton={true}
          messageType="success"
          // content={
          //   <RegisterPricingModal isOpen={isPricingModalOpen} />
          // }
        />
      ) : (
        ""
      )}
      {isAlertErrorOpen ? (
        <AlertButtonsModal
          onClose={() => setIsAlertErrorOpen(false)}
          isOpen={isAlertErrorOpen}
          setIsOpen={setIsAlertErrorOpen}
          title="فشلت عملية الدفع!"
          buttonOne="حاولة مرة أخرى"
          image={<Image
            src="/assets/icons/alert-payment-error.svg"
            height={220}
            width={220}
            alt="image"
          />}
          messageTitle="فشلت عملية الدفع " 
          messageDesc="يمكنك  الاستفادة من جميع خدمات سهمك" 
          actionButton={false}
          messageType="error"
          // content={
          //   <RegisterPricingModal isOpen={isPricingModalOpen} />
          // }
        />
      ) : (
        ""
      )}

      <div className="mb-20 relative space-y-5">
        <div className="bg-gray-50 border relative border-gray-300 rounded-2xl px-5 pb-5 pt-5">
          <div>
            <h2 className={`font-medium text-2xl px-3 mt-2`}>
              <span>ملخص الطلب </span>
            </h2>
            <div className="bg-white border border-gray-300 rounded-2xl my-5">
              <SimpleCardHeader
                title="نوع الباقة"
                content={
                  <div className="flex items-center gap-4">
                    <AvatarWithText title="باقة بريميوم" desc="199 ريال/سنة" descStyle="text-purpleColor" image={
                        <Image
                        src="/assets/icons/purple-check-icon.svg"
                        height={30}
                        width={30}
                        alt="image"
                      />
                    } />
                  </div>
                }
              />
            </div>
            <div className="bg-white border border-gray-300 rounded-2xl my-5">
              <SimpleCardHeader
                title="ملخص الدفع"
                content={
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      تكلفة الباقة
                    </h3>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      94 ريال
                    </h3>
                  </div>
                }
              />
            </div>
            <div>
              <div className="flex items-center font-medium text-2xl mx-5 my-6 justify-between">
                <h3 className="leading-6 text-gray-900">الإجمالي</h3>
                <h3 className="leading-6 text-gray-900">94 ريال</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 border relative border-gray-300 sm:rounded-2xl px-5 pb-20 md:pb-5 ">
          <div>
            <h2 className={`font-medium text-2xl px-3 mt-6`}>
              <span>الدفع</span>
            </h2>
            <div>
              <StackedRadioCard
                cards={cards}
                selectedCard={selectedCard}
                handleSelectedCardChange={handleSelectedCardChange}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-12 border rounded-2xl border-gray-300 bg-white sm:px-8 pt-3 pb-10 mt-8">
              <div className="col-span-12 px-6 sm:px-0">
                <InputFieldUI label="رقم البطاقة" type="text" name="" />
              </div>
              <div className=" col-span-12 sm:col-span-6 px-6 sm:px-0">
                <InputFieldUI type="text" name="" placeholder="الشهر / السنة" />
              </div>
              <div className=" col-span-12 sm:col-span-6 px-6 sm:px-0">
                <InputFieldUI
                  type="text"
                  name=""
                  placeholder="رمز التحقق CVC"
                />
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={() => {
                setIsAlertErrorOpen(true);
              }}
            >
              <PrimaryButton
                button="إكمال الدفع"
                buttonStyle="py-5 rounded-md !font-normal !bg-primaryColor w-full justify-center mt-6"
              />
            </div>
            <p className="text-xl font-medium text-center mt-3">أو</p>
            <PrimaryButton
              onClick={() => {
                setIsAlertSuccessOpen(true);
              }}
              button="Apple pay"
              buttonStyle="py-5 rounded-md !font-normal !bg-darkColor w-full justify-center mt-6"
            />
          </div>
          <Image
            src="/assets/images/gradient-bottom.svg"
            width={170}
            height={170}
            className="absolute -bottom-14 w-[calc(100%-0.75rem)] left-0 right-0 -z-30"
            alt="img"
          />
        </div>
      </div>
    </>
  );
};

export default OrderSummaryForm;
