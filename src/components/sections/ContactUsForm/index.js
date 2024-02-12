"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/layouts/Footer";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import SwitchUI from "@/components/widgets/SwitchUI";
import TextAreaUI from "@/components/widgets/TextAreaUI";
import PhoneNumberUI from "@/components/widgets/PhoneNumberUI";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import { BH, KW, OM, QA, SA, AE, PK } from 'country-flag-icons/react/3x2'
import Image from "next/image";
import apiCall from "@/components/common/api";
import MessageAlert from "@/components/widgets/MessageAlert";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import ReCAPTCHA from "react-google-recaptcha";

const ContactUsForm = () => {

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");

  const [successAlert, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("success");

  const [recaptchaValue, setRecaptchaValue] = useState(null);

  useEffect(() => {
    // Set window.recaptchaOptions when the component mounts
    window.recaptchaOptions = {
      enterprise: true,
    };

    // Clean up when the component unmounts
    return () => {};
  }, []);

  const countryCodes = [
    {
      name: "Saudi Arabia",
      dial_code: "+966",
      icon : <Image loading="eager"   src="/assets/icons/saudi-arabia-flag.png" width="24" height="24" alt="Saudi Arabia" className="w-5 h-5" priority />,
    },
    {
      name: "Bahrain",
      dial_code: "+973",
      icon : <BH title="Bahrain"/>,
    },
    {
      name: "Kuwait",
      dial_code: "+965",
      icon : <KW title="Kuwait"/>,
    },
    {
      name: "Oman",
      dial_code: "+968",
      icon : <OM title="Oman"/>,
    },
    {
      name: "Qatar",
      dial_code: "+974",
      icon : <QA title="Qatar"/>,
    },
    {
      name: "UAE",
      dial_code: "+971",
      icon : <AE title="UAE"/>,
    },
  ];

  const [activeItem, setActiveItem] = useState(null);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    phone: "",  
    message: "",
    country_code: activeItem || "+966",
  });

  
  const handleChange = (fieldName, value) => {
    
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    console.log(fieldName, value, "contactus")

    // const { name, value } = e.target;
    // setFormData((prevData) => ({ ...prevData, [name]: value }));

    // console.log(name, value, "contactus");
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  // const handleSubmit = async () => {
  //   console.log(formData)
  // };

  const handleSubmitForm = async () => {
    if (!recaptchaValue) {
      setErrorAlert(true);
      setErrorMessage("يرجى التحقق باستخدام reCAPTCHA");
      return;
    }
    console.log(formData, "contactus");
    if(formData.first_name == ""){
      setErrorAlert(true);
      setErrorMessage("يرجى ادخال الاسم الاول");
    }
    else if(formData.last_name == ""){
      
      setErrorAlert(true);
      setErrorMessage("الرجاء إدخال اسمك الأخير");
    }
    else if(formData.email == ""){
      setErrorAlert(true);
      setErrorMessage("رجاءا أدخل بريدك الإلكتروني");
    }
    else if(formData.phone == ""){
      setErrorAlert(true);
      setErrorMessage("يرجى إدخال رقم الهاتف الخاص بك");
    }
    else if(formData.message == ""){
      setErrorAlert(true);
      setErrorMessage("يرجى كتابة رسالتك");
    } 
    else {
      const response = await apiCall(
        `/auth/api/user-contact-us/`,
        "POST",
        formData
      );
      if (response && response.result) {
        setSuccessAlert(true);
        setSuccessMessage(response.result.message);
        console.log(formData, response, "contactus");
        setFormData({
          first_name: "",
          last_name: "",
          company: "",
          email: "",
          phone: "",  
          message: "",
          country_code: activeItem || "+966",
        });

      } else {
        setErrorAlert(true);
        setErrorMessage("حدث خطأ ما. أعد المحاولة من فضلك");
        console.error("something went wrong");
      }
    }
  };

  
  const handleMenuItemClick = (item) => {
    handleChange("country_code", item);
    setActiveItem(item);
  };


  return (
    <div>
      {successAlert == true && (
        <MessageAlert
          setOpenModal={setSuccessAlert}
          title="نجاح"
          message={successMessage}
          alertStyle="fixed top-5 !z-50 right-2 text-primaryColor bg-teal-50 "
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
          alertStyle="fixed top-5 !z-50 right-2 text-redColor bg-red-50 "
          icon={
            <XCircleIcon
              className="h-5 w-5 text-redColor"
              aria-hidden="true"
            />
          }
        />
      )}
      <div className=" px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            تواصل معنا
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            إذا كان لديك أي أسئلة، فلا تتردد في الاتصال بنا. نحن هنا لمساعدتك!
          </p>
        </div>
        {/* <form> */}
          <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <InputFieldUI label="الاسم الأول" value={formData.first_name} required={true} name="first_name" type="text" handleChange={(e)=>handleChange("first_name", e.target.value)} />
              </div>
              <div>
                <InputFieldUI label="اسم العائلة" value={formData.last_name} required={true} name="last_name" type="text"  handleChange={(e)=>handleChange("last_name", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <InputFieldUI label="الشركة" name="company" value={formData.company} type="text"  handleChange={(e)=>handleChange("company", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <InputFieldUI label="البريد إلكتروني" name="email" value={formData.email} required={true} type="email"  handleChange={(e)=>handleChange("email", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <PhoneNumberUI
                  name="phone"
                  value={formData.phone}
                  handlePaste={() => {
                    if (
                      /^\d*$/.test(
                        e.clipboardData.getData("text/plain").trim()
                      )
                    ) {
                      handleChange(
                        "phone",
                        e.clipboardData.getData("text/plain").trim()
                      );
                    }
                    // setInputText(e.clipboardData.getData('text/plain').trim());
                  }}
                  autoComplete="tel"
                  title="رقم التواصل"
                  dataList={countryCodes}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  inputmode="numeric"
                  handleChange={(e) => {
                    const value = e.target.value;
                    // Check if the value is a number
                    if (/^\d*$/.test(value)) {
                      // handleChange(e);
                      handleChange("phone", value);
                    }
                  }}
                  required={true}
                  handleMenuItemClick={handleMenuItemClick}
                />
              </div>
              <div className="sm:col-span-2">
                <TextAreaUI label="الرسالة" value={formData.message} name="message" handleChange={(e)=>handleChange("message", e.target.value)} />
              </div>
            </div>
            <div className="mt-10">
              {/* <div className="mb-10">
              <ReCAPTCHA
                sitekey="6Lc0V2wpAAAAAKlSRbnE-wnSSyNS8lWZtLneBMou"
                onChange={handleRecaptchaChange}
              />
              </div> */}
              <div>
              <PrimaryButton
                type="submit"
                onClick={(e)=>handleSubmitForm(e)}
                button="إرسال"
                buttonStyle="py-3 rounded-md !font-normal !bg-secondaryColor hover:!bg-primaryColor w-full justify-center mt-6"
              />
              </div>
            </div>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default ContactUsForm;
