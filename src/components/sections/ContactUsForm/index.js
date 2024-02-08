"use client";
import React, { useState } from "react";
import Footer from "@/components/layouts/Footer";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import SwitchUI from "@/components/widgets/SwitchUI";
import TextAreaUI from "@/components/widgets/TextAreaUI";
import PhoneNumberUI from "@/components/widgets/PhoneNumberUI";
import InputFieldUI from "@/components/widgets/InputFieldUI";
import { BH, KW, OM, QA, SA, AE, PK } from 'country-flag-icons/react/3x2'
import Image from "next/image";


const ContactUsForm = () => {

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
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    phone: "",  
    message: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    console.log(name, value, "contactus");
  };

  const handleSubmit = async () => {
    console.log(formData)
  };

  // const handleSubmit = async () => {
  //   if (
  //     formData.target_price !== "" ||
  //     formData.target_price !== "custom" ||
  //     formData.target_price !== null
  //   ) {
  //     const endpoint = formData.id
  //       ? "/api/stocks/update/"
  //       : "/api/stocks/create/";
  //     const method = formData.id ? "PUT" : "POST";
  //     const response = await apiCall(endpoint, method, formData);
  //     if (response.error) {
  //       setErrorAlert(true);
  //       setErrorMessage(response.error);
  //     } else {
  //       setSuccessAlert(true);
  //       setSuccessMessage(response.result.message);

  //       // Update formPayload after successful operation
  //       if (formData.id) {
  //         setTableData((prevPeople) => [...prevPeople, formData]);
  //         // Update existing stock
  //       }
  //     }
  //   }
  // };


  return (
    <div>
      <div className=" px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            تواصل معنا
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            إذا كان لديك أي أسئلة، فلا تتردد في الاتصال بنا. نحن هنا لمساعدتك!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <InputFieldUI label="الاسم الأول" name="firstname" handleChange={handleChange} />
            </div>
            <div>
              <InputFieldUI label="اسم العائلة" name="lastname" handleChange={handleChange} />
            </div>
            <div className="sm:col-span-2">
              <InputFieldUI label="الشركة" name="company" handleChange={handleChange} />
            </div>
            <div className="sm:col-span-2">
              <InputFieldUI label="البريد إلكتروني" name="email" handleChange={handleChange} />
            </div>
            <div className="sm:col-span-2">
              <PhoneNumberUI
                title="رقم التواصل"
                dataList={countryCodes}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                inputmode="numeric"
                handleChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <TextAreaUI label="رسالة" name="message" handleChange={handleChange} />
            </div>
          </div>
          <div className="mt-10">
            <div onClick={(e)=>handleSubmit(e)}>
            <PrimaryButton
              button="إرسال"
              buttonStyle="py-3 rounded-md !font-normal !bg-secondaryColor hover:!bg-primaryColor w-full justify-center mt-6"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
