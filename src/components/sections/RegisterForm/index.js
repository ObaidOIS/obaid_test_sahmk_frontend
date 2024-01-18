"use client";
import React, { useState, useEffect, useCallback } from "react";
import CheckboxInput from "@/components/widgets/CheckboxInput";
import PrimaryPackageCard from "../PrimaryPackageCard";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import Image from "next/image";
import ModalUI from "@/components/widgets/ModalUI";
import RegisterPricingModal from "../RegisterPricingModal";
import PhoneNumberUI from "@/components/widgets/PhoneNumberUI";
import { BH, KW, OM, QA, SA, AE, PK } from "country-flag-icons/react/3x2";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import AllFeaturesModal from "../AllFeaturesModal";
import MultiSelectSearchInput from "@/components/widgets/MultiSelectSearchInput";
import SimpleAlertModalUI from "@/components/widgets/SimpleAlertModalUI";
import OtpModal from "../OtpModal";
import MessageAlert from "@/components/widgets/MessageAlert";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
// import XCircleIcon from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "next/navigation";
import apiCall from "@/components/common/api";
import { debounce, getFullPhoneNumber } from "@/components/common/utils";
import NotificationAlert from "@/components/widgets/NotificationAlert";

const isValidFirstName = (value) => value.trim() !== "";
const isValidLastName = (value) => value.trim() !== "";
const isValidEmail = (value) => value.trim() !== "";
const isValidPhoneNumber = (value) => value.trim() !== "";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const subscription = searchParams.get("subscription");
  const duration = searchParams.get("duration");

  const [isFormValid, setIsFormValid] = useState(false);
  // const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const checkboxes = [
    {
      title: "استقبال أسعار الافتتاح والاغلاق لأسهمي",
      desc: "احصل على أسعار مباشرة لاشتراكات الباقة بريميوم والمتقدمة ومتأخرة 15دقيقة للباقة المجانية",
      badge: "الأسعار مباشرة",
    },
    {
      title: "تفعيل ميزة الأسعار المستهدفة",
      desc: "تتيح لك هذه الخاصية وضع اسعار مستهدفه للاسهم الخاصة بك",
      badge: "",
    },
    {
      title: "استلام تقرير اسبوعي لأداء أسهمك",
      desc: "تتيح لك هذه الخاصية وضع اسعار مستهدفه للاسهم الخاصة بك",
      badge: "",
    },
  ];

  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isAllFeaturesModalOpen, setIsAllFeaturesModalOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");

  const [warningAlert, setWarningAlert] = useState(false);
  const [warningMessage, setWarningMessage] = useState("warning");

  const [successAlert, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("success");

  const countryCodes = [
    {
      name: "Saudi Arabia",
      dial_code: "+966",
      icon: (
        <Image
          src="/assets/icons/saudi-arabia-flag.png"
          width="24"
          height="24"
          alt="Saudi Arabia"
          className="w-5 h-5"
        />
      ),
    },
    {
      name: "Bahrain",
      dial_code: "+973",
      icon: <BH title="Bahrain" />,
    },
    {
      name: "Kuwait",
      dial_code: "+965",
      icon: <KW title="Kuwait" />,
    },
    {
      name: "Oman",
      dial_code: "+968",
      icon: <OM title="Oman" />,
    },
    {
      name: "Qatar",
      dial_code: "+974",
      icon: <QA title="Qatar" />,
    },
    {
      name: "UAE",
      dial_code: "+971",
      icon: <AE title="UAE" />,
    },
    {
      name: "PK",
      dial_code: "+92",
      icon: <PK title="PK" />,
    },
  ];

  const frequencies = [
    { value: "monthly", label: "شهري", priceSuffix: "/شهري" },
    { value: "annually", label: "سنوي", priceSuffix: "/سنوي" },
  ];

  // State for OTP Modal visibility
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  // const [selectedOption, setSelectedOption] = useState(subscription != undefined ? subscription : "الباقة المجانية" );
  // const [frequency, setFrequency] = useState(duration != undefined ? duration : frequencies[0]);

  const [selectedOption, setSelectedOption] = useState("الباقة المجانية");
  const [frequency, setFrequency] = useState(frequencies[0]);

  const [currentPlan, setCurrentPlan] = useState("الباقة المجانية");

  const [currentPlanDuration, setCurrentPlanDuration] = useState(
    frequencies[0]
  );

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryCode: activeItem || "+966",
    subscriptionType: "premium",
    subscriptionPeriod: "yearly",
    selectedCompanies: [],
  });

  const handleMenuItemClick = (item) => {
    handleDataChange("countryCode", item);
    setActiveItem(item);
  };

  // Effect to update subscriptionType based on selectedOption
  useEffect(() => {
    switch (selectedOption) {
      case "باقة بريميوم":
        setUserData((prevData) => ({
          ...prevData,
          subscriptionType: "premium",
        }));
        break;
      case "الباقة المتقدمة":
        setUserData((prevData) => ({
          ...prevData,
          subscriptionType: "companies",
        }));
        break;
      case "الباقة المجانية":
        setUserData((prevData) => ({ ...prevData, subscriptionType: "free" }));
        break;
      default:
        // You can set a default case if needed
        break;
    }
  }, [selectedOption]);

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
      card: "free",
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
      card: "premium",
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
      card: "advance",
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

  // const handleCheckboxChange = (value, isChecked) => {
  //   setSelectedCheckboxes((prevCheckboxes) => {
  //     if (isChecked) {
  //       return prevCheckboxes.filter((checkbox) => checkbox !== value);
  //     } else {
  //       return [...prevCheckboxes, value];
  //     }
  //   });
  // };

  const validateForm = () => {
    // Validate each field and update the overall form validity
    setIsFormValid(
      isValidFirstName(userData.firstName) &&
      isValidLastName(userData.lastName) &&
      isValidEmail(userData.email) &&
      isValidPhoneNumber(userData.phoneNumber)
      // &&
      // selectedCheckboxes.length > 0
    );
  };

  // Function to open the OTP Modal
  const handleOpenOtpModal = () => {
    // Check if the necessary userData fields are not empty (add fields as necessary)
    if (
      userData.firstName &&
      userData.lastName &&
      userData.email &&
      userData.phoneNumber
      // &&
      // selectedCheckboxes.length > 0
    ) {
      setIsOtpModalOpen(true);
    } else {
      // Handle the case when userData is incomplete
      // For example, set an error message and display it
      setErrorMessage("يرجى تعبئة كامل البيانات");
      setErrorAlert(true);
    }
  };

  const handleDataChange = (fieldName, value) => {
    setUserData({
      ...userData,
      [fieldName]: value,
    });
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [phoneNumberExists, setPhoneNumberExists] = useState(false);
  // State to track if phone number exists

  // Function to check if the phone number exists
  const checkPhoneNumber = async () => {
    if (userData.phoneNumber.length >= 9) {
      const fullPhoneNumber = getFullPhoneNumber(userData);
      const response = await apiCall(
        `/auth/api/check_phone_number/?phone_number=${fullPhoneNumber}`,
        "GET"
      );
      if (response && response.result && response.result.exists) {
        setPhoneNumberExists(true);
        setWarningAlert(true);
        setWarningMessage(
          "هذا الرقم موجود بالفعل، يرجى تسجيل الدخول للمتابعة."
        );
      } else {
        setPhoneNumberExists(false);
      }
    }
  };

  // Use useCallback to memoize the debounced version of checkPhoneNumber
  const debouncedCheckPhoneNumber = useCallback(
    debounce(checkPhoneNumber, 500),
    [userData] // Dependencies
  );

  // Use effect to trigger the debounced function when phone number changes
  useEffect(() => {
    if (userData.phoneNumber) {
      debouncedCheckPhoneNumber();
    }
  }, [userData.phoneNumber, debouncedCheckPhoneNumber]);

  // useEffect(() => {
  //   if (phoneNumberExists) {
  //     alert("هذا الرقم موجود بالفعل، يرجى تسجيل الدخول." + " " + userData.countryCode + " " + userData.phoneNumber);
  //   }
  // }, [phoneNumberExists]);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPhoneNumber();
    if (phoneNumberExists == false) {
      handleOpenOtpModal();
    }
  };

  const handleUpgradPlan = (data) => {
    // Create a replacer function for handling circular references
    const circularReferenceReplacer = () => {
      // Create a WeakSet to keep track of seen objects
      const seen = new WeakSet();

      // Return a replacer function
      return (key, value) => {
        // If the value is an object and not null
        if (typeof value === "object" && value !== null) {
          // If the object has been seen before (circular reference), return undefined
          if (seen.has(value)) {
            return;
          }
          // Add the object to the set to mark it as seen
          seen.add(value);
        }
        // Return the value
        return value;
      };
    };
    // Use JSON.stringify with the circularReferenceReplacer
    const serializedData = JSON.stringify(data, circularReferenceReplacer());

    // Save the serialized data to localStorage
    localStorage.setItem("currentPlanRegister", serializedData);
    setCurrentPlan(data);
  };

  const handleUpgardPlanDuration = (data) => {
    // Create a replacer function for handling circular references
    const circularReferenceReplacer = () => {
      // Create a WeakSet to keep track of seen objects
      const seen = new WeakSet();

      // Return a replacer function
      return (key, value) => {
        // If the value is an object and not null
        if (typeof value === "object" && value !== null) {
          // If the object has been seen before (circular reference), return undefined
          if (seen.has(value)) {
            return;
          }
          // Add the object to the set to mark it as seen
          seen.add(value);
        }
        // Return the value
        return value;
      };
    };

    // Use JSON.stringify with the circularReferenceReplacer
    const serializedData = JSON.stringify(data, circularReferenceReplacer());

    // Save the serialized data to localStorage
    localStorage.setItem("currentPlanDurationRegister", serializedData);
    setCurrentPlanDuration(data);
    // setFrequency(data);
  };

  useEffect(() => {
    // Create a replacer function for handling circular references
    const circularReferenceReplacer = () => {
      // Create a WeakSet to keep track of seen objects
      const seen = new WeakSet();

      // Return a replacer function
      return (key, value) => {
        // If the value is an object and not null
        if (typeof value === "object" && value !== null) {
          // If the object has been seen before (circular reference), return undefined
          if (seen.has(value)) {
            return;
          }
          // Add the object to the set to mark it as seen
          seen.add(value);
        }
        // Return the value
        return value;
      };
    };

    // Use JSON.stringify with the circularReferenceReplacer
    const serializedData = JSON.stringify(
      frequencies[0],
      circularReferenceReplacer()
    );

    // Save the serialized data to localStorage
    localStorage.setItem("currentPlanDurationRegister", serializedData);
    // Update the states whenever the original subscription details change
    setCurrentPlanDuration(frequencies[0]);
  }, []);

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
        {warningAlert == true && (
          <NotificationAlert
            isOpen={warningAlert}
            setOpenModal={setWarningAlert}
            title="خطأ"
            message={warningMessage}
            alertStyle="fixed top-5 right-2 "
            icon={
              <XCircleIcon
                className="h-5 w-5 text-mediumGreyColor"
                aria-hidden="true"
              />
            }
            button={{ name: "تسجيل الدخول", href: "/auth/login" }}
          />
        )}
      </div>
      {/* OTP Modal Code */}
      {isOtpModalOpen && (
        <SimpleAlertModalUI
          onClose={() => setIsOtpModalOpen(false)}
          isOpen={isOtpModalOpen}
          content={
            <OtpModal
              currentPlan={currentPlan}
              isOpen={isOtpModalOpen}
              userData={userData}
              previousPage={"signup"}
              setErrorMessage={setErrorMessage}
              setErrorAlert={setErrorAlert}
              setSuccessAlert={setSuccessAlert}
              setSuccessMessage={setSuccessMessage}
              selectedOption={selectedOption}
            />
          } // Adjust according to your implementation
        />
      )}
      {isPricingModalOpen ? (
        <ModalUI
          onClose={() => setIsPricingModalOpen(false)}
          isOpen={isPricingModalOpen}
          title="الباقات"
          button="حفظ"
          onClickHandle={() => setIsPricingModalOpen(false)}
          content={
            <RegisterPricingModal
              isOpen={isPricingModalOpen}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              frequencies={frequencies}
              frequency={frequency}
              setFrequency={setFrequency}
              pricingRadio={pricingRadio}
              setSelectedItems={setSelectedItems}
              handleUpgradPlan={handleUpgradPlan}
              currentPlan={currentPlan}
              handleUpgardPlanDuration={handleUpgardPlanDuration}
              currentPlanDuration={currentPlanDuration}
            />
          }
        />
      ) : (
        ""
      )}
      {isAllFeaturesModalOpen ? (
        <ModalUI
          onClose={() => setIsAllFeaturesModalOpen(false)}
          isOpen={isAllFeaturesModalOpen}
          title="كل المميزات"
          button="يغلق"
          onClickHandle={() => setIsAllFeaturesModalOpen(false)}
          content={
            <AllFeaturesModal
              isOpen={isAllFeaturesModalOpen}
              selectedOption={selectedOption}
              features={
                selectedOption == "الباقة المتقدمة"
                  ? pricingRadio[2].features[frequency.value]
                  : selectedOption == "باقة بريميوم"
                    ? pricingRadio[1].features[frequency.value]
                    : pricingRadio[0].features[frequency.value]
              }
            />
          }
        />
      ) : (
        ""
      )}
      <form>
        <div className="mb-20 relative">
          <div className="bg-gray-50 border relative border-gray-300 sm:rounded-2xl px-5 pb-20 md:pb-5 pt-5">
            <div>
              <h2 className={`font-medium text-2xl px-3 mt-2`}>
                <span className=" text-primaryColor">01 . </span>
                <span>الباقات </span>
              </h2>
              <div className="bg-white border border-gray-300 rounded-2xl pt-3 pb-8 my-5">
                <PrimaryPackageCard
                  pricingRadio={pricingRadio}
                  frequency={frequency}
                  selectedOption={selectedOption}
                  setIsPricingModalOpen={setIsPricingModalOpen}
                  setIsAllFeaturesModalOpen={setIsAllFeaturesModalOpen}
                  features={
                    selectedOption == "الباقة المتقدمة"
                      ? pricingRadio[2].features[frequency.value]
                      : selectedOption == "باقة بريميوم"
                        ? pricingRadio[1].features[frequency.value]
                        : pricingRadio[0].features[frequency.value]
                  }
                />
              </div>
            </div>
            <div>
              <h2 className={`font-medium text-2xl px-3 my-8`}>
                <span className=" text-primaryColor">02 . </span>
                <span> معلومات الحساب </span>
              </h2>
              <div className="grid gap-6 mb-6 md:grid-cols-2 sm:shadow-md border border-gray-300 sm:border-0 bg-white px-6 sm:px-8 pt-10 pb-8 sm:pb-16 mt-8 rounded-2xl sm:rounded-md">
                <InputFieldUI
                  label="الاسم الأول"
                  type="text"
                  name="first-name"
                  value={userData.firstName}
                  handleChange={(e) =>
                    handleDataChange("firstName", e.target.value)
                  }
                  required={true}
                  // isValid={isValidFirstName(userData.firstName)}
                  isValid={false}
                />
                <InputFieldUI
                  label="الاسم الأخير"
                  type="text"
                  name="last-name"
                  value={userData.lastName}
                  handleChange={(e) =>
                    handleDataChange("lastName", e.target.value)
                  }
                  required={true}
                  // isValid={isValidLastName(userData.lastName)}
                  isValid={false}
                />
                <InputFieldUI
                  label="البريد الإكلتروني"
                  type="email"
                  name="email"
                  value={userData.email}
                  handleChange={(e) =>
                    handleDataChange("email", e.target.value)
                  }
                  required={true}
                  // isValid={isValidEmail(userData.email)}
                  isValid={false}
                />
                <div className="border-t sm:border-t-0 pt-6 sm:pt-0 mt-2 sm:mt-0">
                  <PhoneNumberUI
                    title="رقم الجوال"
                    dataList={countryCodes}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    handleChange={(e) => {
                      const value = e.target.value;
                      // Check if the value is a number
                      if (/^\d*$/.test(value)) {
                        handleDataChange("phoneNumber", value);
                      }
                    }}
                    value={userData.phoneNumber}
                    handleMenuItemClick={handleMenuItemClick}
                    required={true}
                    inputmode="numeric"
                    // isValid={isValidPhoneNumber(userData.phoneNumber)}
                    isValid={false}
                  />
                  <div className="flex sm:hidden items-center text-sm text-gray-400 gap-3 mt-6">
                    رقم الجوال يجب أن يكون مشترك في الواتساب
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className={`font-medium text-2xl px-3 mt-6`}>
                <span className=" text-primaryColor">03 . </span>
                <span>الخطوة الأخيرة </span>
              </h2>
              <div className=" bg-white px-6 pb-14 pt-6 sm:px-8 mt-8 sm:border border-gray-300 rounded-2xl sm:rounded-md sm:shadow-md">
                <MultiSelectSearchInput
                  setUserData={setUserData}
                  selectedOption={selectedOption}
                  setSelectedItems={setSelectedItems}
                  selectedItems={selectedItems}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  originalData={originalData}
                  setOriginalData={setOriginalData}
                  setErrorAlert={setErrorAlert}
                  setErrorMessage={setErrorMessage}
                />
                <p className="text-sm text-darkGreyColor">
                  {selectedOption === "الباقة المجانية"
                    ? "الترقية إلى الإصدار المميز أو التقدم لاختيار الشركات."
                    : ""}
                </p>
                <div className="flex text-secondaryColor mt-4">
                  يمكنك إعدادها لاحقا
                </div>
                <div className="flex font-medium mt-4  pt-8 border-t ">
                  المزايا التي ترغب بتفعليها{" "}
                </div>

                {checkboxes.map((item, index) => {
                  return (
                    <div key={index}>
                      <CheckboxInput
                        // required={true}
                        title={item.title}
                        desc={item.desc}
                        badge={item.badge}
                      // handleChange={(isChecked) =>
                      //   handleCheckboxChange(item.title, isChecked)
                      // }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <PrimaryButton
              onClick={(e) => {
                validateForm();
                handleSubmit(e);
              }}
              button="تسجيل"
              buttonStyle="py-5 rounded-md !font-normal w-full justify-center mt-6"
            />
            <Image
              src="/assets/images/gradient-bottom.svg"
              width={170}
              height={170}
              className="absolute -bottom-14 w-[calc(100%-0.75rem)] left-0 right-0 -z-30"
              alt="img"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
