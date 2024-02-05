"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AlertButtonsModal from "@/components/widgets/AlertButtonsModal";
import SimpleCardHeader from "@/components/widgets/SimpleCardHeader";
import AvatarWithText from "@/components/widgets/AvatarWithText";
import apiCall from "@/components/common/api";
import { pricing } from "@/components/common/pricing";
import Loader from "@/components/widgets/Loader";
import { usePathname } from "next/navigation";
import { isAuthenticated } from "@/components/common/utils";
import { useRouter } from "next/navigation";

const OrderSummaryForm = (
  originalSubscriptionDetails,
  selectedOption,
  setSelectedOption,
  frequency,
  setFrequency,
  subscriptionTypeMap,
  subscriptionPeriodMap,
  subscriptionPeriod,
  frequencies,
  currentDuration
  // currentPlanDuration,
  // setCurrentPlanDuration,
) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState(false);
  const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false);
  const [origin, setOrigin] = useState(
    "https://sahmk.sa"
  );
  const [price, setPrice] = useState("");
  const [currentPlan, setCurrentPlan] = useState("");
  const [currentPlanDuration, setCurrentPlanDuration] =
    useState(currentDuration);
  //   subscriptionPeriodMap[originalSubscriptionDetails?.subscriptionPeriod] ||
  //     frequencies[0]);
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    countryCode: "",
    subscriptionType: "",
    subscriptionPeriod: "",
    expirationDate: null,
  });

  useEffect(() => {
    // Set the origin state to the current window location's origin
    const currentPlanRegister = localStorage.getItem("currentPlanRegister")
    if (currentPlanRegister == "الباقة المجانية") {
      if (isAuthenticated()) {
        router.push("/userprofile");
      } else {
        router.push("/auth/register");
      }
    }
    // This includes the protocol and host
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    // This effect runs once on component mount to fetch the user data
    const fetchUserData = async () => {
      const response = await apiCall("/auth/api/user/");
      const userData = response.result;
      if (userData) {
        if (pathname == "/auth/order") {
        setUserData({
          name: userData.fullName,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          countryCode: userData.countryCode,
          subscriptionType: userData.subscriptionType,
          subscriptionPeriod: userData.subscriptionPeriod,
          expirationDate: userData.expirationDate,
        });
      }
      if (pathname == "/userprofile") {
        setUserData({
          name: userData.fullName,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          countryCode: userData.countryCode,
          subscriptionType: (currentPlan?.title || currentPlan) == "الباقة المتقدمة" ? "companies"
          : (currentPlan?.title || currentPlan) == "باقة بريميوم" ? "premium" : "free",
          // subscriptionPeriod: userData.subscriptionPeriod,
          subscriptionPeriod: (currentPlan?.title || currentPlan) == "الباقة المتقدمة"
          ?
          currentPlanDuration
            ? currentPlanDuration?.value == "annually" ? "yearly" : currentPlanDuration?.value
            : frequency?.value == "annually" ? "yearly" : frequency?.value
          
          : (currentPlan?.title || currentPlan) == "باقة بريميوم"
            ? 
            currentPlanDuration
              ? currentPlanDuration?.value == "annually" ? "yearly" : currentPlanDuration?.value
              : frequency?.value == "annually" ? "yearly" : frequency?.value
            
            : 
            currentPlanDuration
              ? currentPlanDuration?.value == "annually" ? "yearly" : currentPlanDuration?.value
              : frequency?.value == "annually" ? "yearly" : frequency?.value
            ,
          expirationDate: userData.expirationDate,
        });
      }
        const calculatedPrice =
          pricing["pricing"][userData.subscriptionType][
          userData.subscriptionPeriod
          ];
        if (calculatedPrice) {
          setPrice(calculatedPrice);
        }
      }
    };

    fetchUserData();
  }, [currentPlan, currentPlanDuration]);

  const navigateToAnotherPage = () => {
    setTimeout(() => {
      router.push("/userprofile");
    }, 3000);
  };

  // console.log(userData, (currentPlan?.title || currentPlan) == "الباقة المتقدمة" ? "companies"
  // : (currentPlan?.title || currentPlan) == "باقة بريميوم" ? "premium" : "free", "userData");

  useEffect(() => {
    
  // Verify payment when redirected back to this page
    const verifyPayment = async (paymentId) => {
      const result = await apiCall("/api/checkout/verify-payment/", "POST", 
      {
        id: paymentId,
        ...userData,
      } 
      // {
      //   id: paymentId,
      //   // ...userData,
      //   name: userData.fullName,
      //   phoneNumber: userData.phoneNumber,
      //   email: userData.email,
      //   countryCode: userData.countryCode,
      //   subscriptionType: (currentPlan?.title || currentPlan) == "الباقة المتقدمة" ? "companies"
      //   : (currentPlan?.title || currentPlan) == "باقة بريميوم" ? "premium" : "free",
      //   // subscriptionPeriod: userData.subscriptionPeriod,
      //   subscriptionPeriod: (currentPlan?.title || currentPlan) == "الباقة المتقدمة"
      //   ?
      //   currentPlanDuration
      //     ? currentPlanDuration?.value == "annually" ? "yearly" : currentPlanDuration?.value
      //     : frequency?.value == "annually" ? "yearly" : frequency?.value
        
      //   : (currentPlan?.title || currentPlan) == "باقة بريميوم"
      //     ? 
      //     currentPlanDuration
      //       ? currentPlanDuration?.value == "annually" ? "yearly" : currentPlanDuration?.value
      //       : frequency?.value == "annually" ? "yearly" : frequency?.value
          
      //     : 
      //     currentPlanDuration
      //       ? currentPlanDuration?.value == "annually" ? "yearly" : currentPlanDuration?.value
      //       : frequency?.value == "annually" ? "yearly" : frequency?.value
      //     ,
      //   expirationDate: userData.expirationDate,
      // }
      );

      // console.log(userData, (currentPlan?.title || currentPlan) == "الباقة المتقدمة" ? "companies"
      // : (currentPlan?.title || currentPlan) == "باقة بريميوم" ? "premium" : "free", (currentPlan?.title || currentPlan) == "الباقة المتقدمة"
      // ?
      // currentPlanDuration
      //   ? currentPlanDuration?.value == "annually" ? "yearly" : currentPlanDuration?.value
      //   : frequency?.value == "annually" ? "yearly" : frequency?.value
      
      // : (currentPlan?.title || currentPlan) == "باقة بريميوم"
      //   ? 
      //   currentPlanDuration
      //     ? currentPlanDuration?.value == "annually" ? "yearly" : currentPlanDuration?.value
      //     : frequency?.value == "annually" ? "yearly" : frequency?.value
        
      //   : 
      //   currentPlanDuration
      //     ? currentPlanDuration?.value == "annually" ? "yearly" : currentPlanDuration?.value
      //     : frequency?.value == "annually" ? "yearly" : frequency?.value
      //   , "userData");

      if (result && result.result && result.result.check) {
        setIsAlertSuccessOpen(true);
        // router.push("/userprofile");
        navigateToAnotherPage();
      } else {
        setIsAlertErrorOpen(true);
      }
    };

    if (typeof window !== "undefined") {
      // Parse the current URL and its search parameters
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);

      const paymentId = params.get("id");
      const paymentStatus = params.get("status");
      const paymentMessage = params.get("message");

      if (paymentId && paymentStatus && paymentMessage &&
        userData.subscriptionPeriod && userData.subscriptionType) {
        verifyPayment(paymentId);
      }
    }
  }, [userData.subscriptionPeriod, userData.subscriptionType]);

  const [buttonPrice, setButtonPrice] = useState(1);

  // const buttonPrice = Number.isInteger(20);
  const initMoyasar = (p) => {
    window.Moyasar.init({
      element: ".mysr-form",
      // amount: (price || 1) * 100,
      amount: p * 100,
      currency: "SAR",
      description: "Sahmk Purchase",
      publishable_api_key: "pk_live_nhg2PWy2JCp1xNzXbRCuUWcQysA7u6K7kDt7sM3T",
      // publishable_api_key: "pk_test_r3B5JuvWzF5LG6bZUugRWgb5YqEQKwzYu4nu6qVB",
      callback_url: `${origin}/auth/order/`,
      methods: ["creditcard", "stcpay", "applepay"],
      apple_pay: {
        country: "SA",
        label: "Sahmk",
        validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
      },
      credit_card: {
        save_card: true,
      },
      on_completed: function (payment) {
        return new Promise(async function (resolve, reject) {
          const result = await apiCall("/api/checkout/save-payment/", "POST", {
            ...payment,
            token: payment.source.token,
          });

          if (result && result.result && result.result.check) {
            resolve({});
            setIsAlertSuccessOpen(true);
            // setSuccessMessage("success");
            if (isAlertSuccessOpen == false) {
              console.log(isAlertSuccessOpen, "hello payment");
            }
          } else {
            reject();
            setIsAlertErrorOpen(true);
            // setErrorMessage("error");
          }
        });
      },
    });
  };

  useEffect(() => {
    if (pathname == "/auth/order") {
      const currentPlanJSON = localStorage.getItem("currentPlanRegister");

      if (currentPlanJSON) {
        try {
          setCurrentPlan(JSON.parse(currentPlanJSON));
        } catch (error) {
          // If parsing fails, set the currentPlan to the raw string
          setCurrentPlan(currentPlanJSON);
        }
      } else {
        // Handle the case where currentPlanJSON is not available
        console.error("currentPlanJSON is not available in localStorage");
      }
      // setCurrentPlan(JSON.parse(localStorage.getItem("currentPlanRegister")));
      setCurrentPlanDuration(
        JSON.parse(localStorage.getItem("currentPlanDurationRegister"))
      );
    } else {
      setCurrentPlan(JSON.parse(localStorage.getItem("currentPlan")));
      setCurrentPlanDuration(
        JSON.parse(localStorage.getItem("currentPlanDuration"))
      );
    }
  }, [pathname]);

  useEffect(() => {
    setButtonPrice(
      (currentPlan?.title || currentPlan) == "الباقة المتقدمة"
        ? pricing.pricing.companies[
        currentPlanDuration ? currentPlanDuration?.value : frequency?.value
        ]
        : (currentPlan?.title || currentPlan) == "باقة بريميوم"
          ? pricing.pricing.premium[
          currentPlanDuration ? currentPlanDuration?.value : frequency?.value
          ]
          : pricing.pricing.free[
          currentPlanDuration ? currentPlanDuration?.value : frequency?.value
          ]
    );
  }, [buttonPrice]);

  useEffect(() => {
    // Include Moyasar CSS and JS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.moyasar.com/mpf/1.12.0/moyasar.css";
    document.head.appendChild(link);

    // Load Moyasar scripts
    const scriptUrls = [
      "https://polyfill.io/v3/polyfill.min.js?features=fetch",
      "https://cdn.moyasar.com/mpf/1.12.0/moyasar.js",
    ];

    // Create an array to store dynamically created script elements
    const scriptElements = [];

    const checkAllScriptsLoaded = () => {
      // Check if all scripts have loaded
      if (scriptElements.every((script) => script.loaded)) {
        // All scripts loaded, now set the button price
        setButtonPrice(
          (currentPlan?.title || currentPlan) == "الباقة المتقدمة"
            ? pricing.pricing.companies[
            currentPlanDuration
              ? currentPlanDuration?.value
              : frequency?.value
            ]
            : (currentPlan?.title || currentPlan) == "باقة بريميوم"
              ? pricing.pricing.premium[
              currentPlanDuration
                ? currentPlanDuration?.value
                : frequency?.value
              ]
              : pricing.pricing.free[
              currentPlanDuration
                ? currentPlanDuration?.value
                : frequency?.value
              ]
        );
        // Initialize Moyasar after setting the button price
        initMoyasar(
          (currentPlan?.title || currentPlan) == "الباقة المتقدمة"
            ? pricing.pricing.companies[
            currentPlanDuration
              ? currentPlanDuration?.value
              : frequency?.value
            ]
            : (currentPlan?.title || currentPlan) == "باقة بريميوم"
              ? pricing.pricing.premium[
              currentPlanDuration
                ? currentPlanDuration?.value
                : frequency?.value
              ]
              : pricing.pricing.free[
              currentPlanDuration
                ? currentPlanDuration?.value
                : frequency?.value
              ]
        );
      }
    };

    scriptUrls.forEach((url, index) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.loaded = false;

      script.onload = () => {
        script.loaded = true;
        checkAllScriptsLoaded();
      };

      document.head.appendChild(script);

      // Store the script element in the array
      scriptElements.push(script);
    });

    // Cleanup function to remove script and style
    return () => {
      // Remove each dynamically added script element
      scriptElements.forEach((script) => {
        document.head.removeChild(script);
      });
      document.head.removeChild(link);
    };
  }, [buttonPrice]);
  // Empty dependency array means this runs once on mount

  // useEffect(() => {
  //   window.addEventListener("beforeunload", function (e) {
  //     localStorage.removeItem("currentPlan");
  //     localStorage.removeItem("currentPlanDuration");
  // });
  // }, [])

  console.log(currentPlan, "hello current plan")

  return (
    <>
      {currentPlan == undefined ? (
        <Loader />
      ) : (
        <>
          {isAlertSuccessOpen ? (
            <AlertButtonsModal
              onClose={() => setIsAlertSuccessOpen(false)}
              isOpen={isAlertSuccessOpen}
              setIsOpen={setIsAlertSuccessOpen}
              title="تم الاشتراك بنجاح"
              buttonOne="إدارة حسابي"
              image={
                <Image loading="eager"
                  src="/assets/icons/alert-payment-success.svg"
                  height={220}
                  width={220}
                  alt="image"
                  priority
                />
              }
              messageTitle="تم تفعيل باقتك بنجاح 🎉"
              messageDesc="يمكنك الاستفادة من جميع خدمات سهمك"
              buttonTwo="ابدأ بمراسلة النظام الذكي"
              buttonIcon={
                <Image loading="eager"
                  src="/assets/icons/green-right-arrow.svg"
                  height={15}
                  width={15}
                  alt="image"
                  priority
                />
              }
              actionButton={true}
              messageType="success"
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
              image={
                <Image loading="eager"
                  src="/assets/icons/alert-payment-error.svg"
                  height={220}
                  width={220}
                  alt="image"
                  priority
                />
              }
              messageTitle="فشلت عملية الدفع "
              messageDesc="يمكنك  الاستفادة من جميع خدمات سهمك"
              actionButton={false}
              messageType="error"
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
                        {/* <AvatarWithText
                      title="باقة بريميوم"
                      desc="199 ريال/سنة"
                      descStyle="text-purpleColor"
                      image={
                        <Image loading="eager"  
                          src="/assets/icons/purple-check-icon.svg"
                          height={30}
                          width={30}
                          alt="image"
                          priority
                        />
                      }
                    /> */}
                        {currentPlanDuration == undefined ? (
                          ""
                        ) : (
                          <AvatarWithText
                            title={
                              currentPlan
                                ? currentPlan?.title
                                  ? currentPlan?.title
                                  : currentPlan
                                : ""
                            }
                            desc={` ${(currentPlan?.title || currentPlan)  == "الباقة المتقدمة"
                                ? pricing.pricing.companies[
                                currentPlanDuration
                                  ? currentPlanDuration.value
                                  : frequency?.value
                                ]
                                : (currentPlan?.title || currentPlan) == "باقة بريميوم"
                                  ? pricing.pricing.premium[
                                  currentPlanDuration
                                    ? currentPlanDuration.value
                                    : frequency?.value
                                  ]
                                  : pricing.pricing.free[
                                  currentPlanDuration
                                    ? currentPlanDuration.value
                                    : frequency?.value
                                  ]
                              } / ${currentPlanDuration
                                ? currentPlanDuration?.label
                                : frequency?.label
                              } `}
                            descStyle={
                              (currentPlan?.title || currentPlan) == "الباقة المتقدمة"
                                ? "!text-yellowColor"
                                : (currentPlan?.title || currentPlan) == "باقة بريميوم"
                                  ? "!text-purpleColor"
                                  : "!text-blueColor"
                            }
                            image={
                              <Image loading="eager"
                                src={
                                  (currentPlan?.title || currentPlan) == "الباقة المتقدمة"
                                    ? "/assets/icons/yellow-check.svg"
                                    : (currentPlan?.title || currentPlan) == "باقة بريميوم"
                                      ? "/assets/icons/purple-check-icon.svg"
                                      : "/assets/icons/blue-check.svg"
                                }
                                height={30}
                                width={30}
                                alt="image"
                                priority
                              />
                            }
                          />
                        )}
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
                          {/* {price}  */}
                          {(currentPlan?.title || currentPlan) == "الباقة المتقدمة"
                            ? pricing.pricing.companies[
                            currentPlanDuration
                              ? currentPlanDuration?.value
                              : frequency?.value
                            ]
                            : (currentPlan?.title || currentPlan) == "باقة بريميوم"
                              ? pricing.pricing.premium[
                              currentPlanDuration
                                ? currentPlanDuration?.value
                                : frequency?.value
                              ]
                              : pricing.pricing.free[
                              currentPlanDuration
                                ? currentPlanDuration?.value
                                : frequency?.value
                              ]}{" "}
                          ريال
                        </h3>
                      </div>
                    }
                  />
                </div>
                <div>
                  <div className="flex items-center font-medium text-2xl mx-5 my-6 justify-between">
                    <h3 className="leading-6 text-gray-900">الإجمالي</h3>
                    <h3 className="leading-6 text-gray-900">
                      {/* {price} */}
                      {(currentPlan?.title || currentPlan) == "الباقة المتقدمة"
                        ? pricing.pricing.companies[
                        currentPlanDuration
                          ? currentPlanDuration?.value
                          : frequency?.value
                        ]
                        : (currentPlan?.title || currentPlan) == "باقة بريميوم"
                          ? pricing.pricing.premium[
                          currentPlanDuration
                            ? currentPlanDuration?.value
                            : frequency?.value
                          ]
                          : pricing.pricing.free[
                          currentPlanDuration
                            ? currentPlanDuration?.value
                            : frequency?.value
                          ]}
                      ريال
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border relative border-gray-300 sm:rounded-2xl px-5 pb-20 md:pb-5 ">
              <div>
                <h2 className={`font-medium text-2xl px-3 mt-6`}>
                  <span>الدفع</span>
                </h2>
                <div className="mt-8">
                  <div
                    id="payment"
                    className="grid w-full border rounded-2xl border-gray-300 bg-white sm:px-8 pt-8 pb-10"
                  >
                    <div className="mysr-form"></div>
                  </div>
                </div>
              </div>
              <Image loading="eager"
                src="/assets/images/gradient-bottom.svg"
                width={170}
                height={170}
                className="absolute -bottom-14 w-[calc(100%-0.75rem)] left-0 right-0 -z-30"
                alt="img"
                priority
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderSummaryForm;
