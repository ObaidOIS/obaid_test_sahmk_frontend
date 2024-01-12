import AvatarWithText from "@/components/widgets/AvatarWithText";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import PhoneNumberUI from "@/components/widgets/PhoneNumberUI";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import SimpleCardHeader from "@/components/widgets/SimpleCardHeader";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import RegisterPricingModal from "../RegisterPricingModal";
import ModalUI from "@/components/widgets/ModalUI";
import apiCall from "@/components/common/api";
import MessageAlert from "@/components/widgets/MessageAlert";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import {pricing} from "@/components/common/pricing";  

const UserProfileFeatureFour = ({
  handlePageChange,
  plan,
  userData,
  setUserData,
  originalSubscriptionDetails,
  setOriginalSubscriptionDetails,
  handlePlanChange,
}) => {
  const [activeItem, setActiveItem] = useState(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const frequencies = [
    { value: "monthly", label: "شهري", priceSuffix: "/شهري" },
    { value: "annually", label: "سنوي", priceSuffix: "/سنوي" },
  ];


  // Mapping from API values to frontend display values
  const subscriptionTypeMap = {
    free: "الباقة المجانية",
    premium: "باقة بريميوم",
    companies: "الباقة المتقدمة",
  };

  const subscriptionPeriodMap = {
    monthly: frequencies[0], // Assuming this maps to the first frequency object
    yearly: frequencies[1], // Assuming this maps to the second frequency object
  };

  // Initialize states with the original subscription details using mapping
  const [selectedOption, setSelectedOption] = useState(
    subscriptionTypeMap[originalSubscriptionDetails?.subscriptionType] ||
    subscriptionTypeMap.free
  );
  const [frequency, setFrequency] = useState(
    subscriptionPeriodMap[originalSubscriptionDetails?.subscriptionPeriod] ||
      frequencies[0]
  );

  // const [frequency, setFrequency] = useState(frequencies[0]);
  const [currentSubscription, setCurrentSubscription] = useState({});
  const [nextSubscription, setNextSubscription] = useState({});
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");

  const [successAlert, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("success");
  const [isUpgraded, setIsUpgraded] = useState(null);
  const [upgradButton, setUpgradButton] = useState(false);

  const pricingRadio = [
    {
      title: "الباقة المجانية",
      icon: (
        <Image
          src="/assets/icons/blue-check.svg"
          width={25}
          height={25}
          alt="img"
          className="mt-1"
        />
      ),
      desc: "باقة بريميوم مميزة وأسعار مباشرة",
      price: { monthly: "مجاناً", annually: "48 ريال" },
      features: {
        monthly: [
          { feature: "monthly basic", isAvaiable: true },
          {
            feature: "معرفة تفاصيل الشركات المدرجة في الأسهم",
            isAvaiable: true,
          },
          { feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true },
          {
            feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
            isAvaiable: true,
          },
          {
            feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية",
            isAvaiable: false,
          },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: false,
          },
          {
            feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية",
            isAvaiable: false,
          },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: false,
          },
        ],
        annually: [
          { feature: "annually basic", isAvaiable: true },
          { feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true },
          {
            feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
            isAvaiable: true,
          },
          { feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true },
          {
            feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية",
            isAvaiable: false,
          },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: false,
          },
          {
            feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية",
            isAvaiable: false,
          },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: false,
          },
        ],
      },
    },
    {
      title: "باقة بريميوم",
      icon: (
        <Image
          src="/assets/icons/purple-check-icon.svg"
          width={25}
          height={25}
          alt="img"
          className="mt-1"
        />
      ),
      desc: "باقة بريميوم مميزة وأسعار مباشرة",
      price: { monthly: "49 ريال", annually: "488 ريال" },
      features: {
        monthly: [
          { feature: "monthly standard", isAvaiable: true },
          {
            feature: "معرفة تفاصيل الشركات المدرجة في الأسهم",
            isAvaiable: true,
          },
          { feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true },
          {
            feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
            isAvaiable: true,
          },
          { feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: true,
          },
          {
            feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية",
            isAvaiable: false,
          },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: false,
          },
        ],
        annually: [
          { feature: "annually standard", isAvaiable: true },
          { feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true },
          {
            feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
            isAvaiable: true,
          },
          { feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: true,
          },
          {
            feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
            isAvaiable: true,
          },
          {
            feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية",
            isAvaiable: false,
          },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: false,
          },
        ],
      },
    },
    {
      title: "الباقة المتقدمة",
      icon: (
        <Image
          src="/assets/icons/yellow-check.svg"
          width={25}
          height={25}
          alt="img"
          className="mt-1"
        />
      ),
      desc: "باقة بريميوم مميزة وأسعار مباشرة",
      price: { monthly: "99 ريال", annually: "688 ريال" },
      features: {
        monthly: [
          { feature: "monthly premium", isAvaiable: true },
          {
            feature: "معرفة تفاصيل الشركات المدرجة في الأسهم",
            isAvaiable: true,
          },
          { feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true },
          {
            feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
            isAvaiable: true,
          },
          { feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: true,
          },
          { feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: true,
          },
        ],
        annually: [
          { feature: "annually premium", isAvaiable: true },
          { feature: "السؤال عن أوقات التوزيعات لأي سهم", isAvaiable: true },
          {
            feature: "الحصول على تنبيه بأسعار الافتتاح والاغلاق",
            isAvaiable: true,
          },
          { feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: true,
          },
          { feature: "تفعيل خاصية إضافة هدف لأسهمك الحالية", isAvaiable: true },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: true,
          },
          {
            feature: "الحصول على تقرير اسبوعي لأداء السهم PDF",
            isAvaiable: true,
          },
        ],
      },
    },
  ];

  const updateUserData = async () => {
    const endpoint = "/auth/api/user/update/"; // Update this to your actual endpoint if different
    const method = "PUT";

    const result = await apiCall(endpoint, method, userData);
    if (result.error) {
      setErrorAlert(true);
      setErrorMessage(result.error);
    } else {
      setSuccessAlert(true);
      setSuccessMessage(result.result.message);
      setUpgradButton(true);
    }
  };

  const handleDataChange = (fieldName, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Sample function to check if the new plan is an upgrade over the current one
  const checkIfUpgrade = (currentPlan, newPlan) => {
    const planHierarchy = ["free", "premium", "companies"];
    const currentIndex = planHierarchy.indexOf(currentPlan);
    const newIndex = planHierarchy.indexOf(newPlan);

    // Return true if the new plan is a higher index (upgrade)
    return newIndex > currentIndex;
  };

  const checkIfDowngrade = (currentPlan, newPlan) => {
    const planHierarchy = ["free", "premium", "companies"];
    const currentIndex = planHierarchy.indexOf(currentPlan);
    const newIndex = planHierarchy.indexOf(newPlan);

    // Return true if the new plan is a lower index (downgrade)
    return newIndex < currentIndex;
  };

  // Function to handle subscription changes
  const handleSubscriptionChange = (newType, newPeriod) => {
    // Always update the original subscription details
    setOriginalSubscriptionDetails({
      subscriptionType: newType,
      subscriptionPeriod: newPeriod,
    });

    // Check for upgrade or downgrade
    if (checkIfUpgrade(firstType, newType)) {
      setIsUpgraded(true);
    } else if (checkIfDowngrade(firstType, newType)) {
      setIsUpgraded(false);
    } else {
      setIsUpgraded(null);
    }
  };

  useEffect(() => {
    // Update the states whenever the original subscription details change
    setSelectedOption(
      subscriptionTypeMap[originalSubscriptionDetails?.subscriptionType] ||
        subscriptionTypeMap.free
    );
    setFrequency(
      subscriptionPeriodMap[originalSubscriptionDetails?.subscriptionPeriod] ||
        frequencies[0]
    );
  }, [originalSubscriptionDetails]);

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
        {isPricingModalOpen ? (
          <ModalUI
            onClose={() => setIsPricingModalOpen(false)}
            isOpen={isPricingModalOpen}
            onClickHandle={() => setIsPricingModalOpen(false)}
            title="ترقية الباقة"
            button="حفظ"
            content={
              <RegisterPricingModal
                isOpen={isPricingModalOpen}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
                frequencies={frequencies}
                frequency={frequency}
                setFrequency={setFrequency}
                pricingRadio={pricingRadio}
              />
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
                  title={plan == "" ? selectedOption : plan}
                  desc={` ${
                  plan == "" ? 
                      selectedOption == "الباقة المتقدمة"
                      ? pricing.pricing.companies[frequency?.value]
                      : selectedOption == "باقة بريميوم"
                      ? pricing.pricing.premium[frequency?.value]
                      : pricing.pricing.free[frequency.value]
                    : 
                      plan == "الباقة المتقدمة"
                      ? pricing.pricing.companies[frequency?.value]
                      : plan == "باقة بريميوم"
                      ? pricing.pricing.premium[frequency?.value]
                      : pricing.pricing.free[frequency.value]
                    } / ${frequency.label} `}
                  descStyle={
                    plan == "" ? 
                      selectedOption == "الباقة المتقدمة"
                      ? "!text-yellowColor"
                      : selectedOption == "باقة بريميوم"
                      ? "!text-purpleColor"
                      : "!text-blueColor"
                    : 
                      plan == "الباقة المتقدمة"
                      ? "!text-yellowColor"
                      : plan == "باقة بريميوم"
                      ? "!text-purpleColor"
                      : "!text-blueColor"
                  }
                  image={
                    <Image
                      src={
                        plan == "" ? 
                        selectedOption == "الباقة المتقدمة"
                          ? "/assets/icons/yellow-check.svg"
                          : selectedOption == "باقة بريميوم"
                          ? "/assets/icons/purple-check-icon.svg"
                          : "/assets/icons/blue-check.svg"
                        :
                            plan == "الباقة المتقدمة"
                            ? "/assets/icons/yellow-check.svg"
                            : plan == "باقة بريميوم"
                            ? "/assets/icons/purple-check-icon.svg"
                            : "/assets/icons/blue-check.svg"
                      }
                      height={30}
                      width={30}
                      alt="image"
                    />
                  }
                />
                <div
                  className="mt-3"
                  onClick={() => {
                    setIsPricingModalOpen(true);
                  }}
                >
                  <PrimaryButton
                    button="ترقية باقتي"
                    buttonStyle="py-3 rounded-md !font-normal !bg-primaryColor/10 !text-primaryColor w-full justify-center mt-6"
                  />
                </div>
                {selectedOption != (subscriptionTypeMap[originalSubscriptionDetails?.subscriptionType]) ?
                  (
                  <div
                    className="mt-3"
                    onClick={() => {
                      handlePageChange({
                        name: "payment",
                        value: "باقتي وحسابي",
                      });
                      handlePlanChange(selectedOption, frequency);
                    }}
                  >
                    <PrimaryButton
                      button="متابعة للدفع"
                      buttonStyle="py-3 rounded-md !font-normal !bg-secondaryColor w-full justify-center mt-6"
                    />
                  </div>
                ) : ""}
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
              <InputFieldUI
                label="الاسم الأول"
                type="text"
                name=""
                value={userData.name}
                handleChange={(e) =>
                  handleDataChange("firstName", e.target.value)
                }
              />
            </div>
            <div className="px-6 sm:px-0">
              <InputFieldUI
                type="text"
                name=""
                label="الاسم الأخير"
                placeholder="الشهر / السنة"
                value={userData.email}
                handleChange={(e) => handleDataChange("email", e.target.value)}
              />
            </div>
            <div className="px-6 sm:px-0">
              {/* <InputFieldUI type="text" name="" label="" placeholder="رمز التحقق CVC" /> */}
              <PhoneNumberUI
                title="رقم الجوال"
                dataList={[{ dial_code: userData.countryCode }]}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                value={userData.phoneNumber}
              />
            </div>
            {/* <div className="px-6 sm:px-0">
              <PrimaryButton
                button="تحديث"
                buttonStyle="py-3 rounded-md !font-normal !bg-secondaryColor w-full justify-center mt-6"
                onClick={updateUserData}
              />
            </div> */}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default UserProfileFeatureFour;
