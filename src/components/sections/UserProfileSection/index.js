"use client";
import React, { useState, useEffect } from "react";
import ArrowList from "@/components/widgets/ArrowList";
import SimpleLineChart from "@/components/widgets/SimpleLineChart";
import Image from "next/image";
import MainBadge from "@/components/widgets/MainBadge";
import ProfileFooter from "@/components/sections/ProfileFooter";
import MainSidebar from "@/components/widgets/MainSidebar";
import DarkNavOverlay from "../DarkNavOverlay";
import Stats from "@/components/widgets/Stats";
import UserProfileFeatureOne from "../UserProfileFeatureOne";
import UserProfileFeatureTwo from "../UserProfileFeatureTwo";
import UserProfileFeatureFour from "../UserProfileFeatureFour";
import OrderSummaryForm from "../OrderSummaryForm";
import UserProfileFeatureThree from "../UserProfileFeatureThree";
import apiCall from "@/components/common/api";
import { extractCountryCodeFromPhoneNumber } from "@/components/common/utils";
import { isAuthenticated } from "@/components/common/utils";
import { useRouter } from "next/navigation";
import UserProfileStatistics from "../UserProfileStatistics";
import { usePathname } from "next/navigation";
import DotBadgeUI from "@/components/widgets/DotBadgeUI";
import moment from "moment-timezone";
import Loader from "@/components/widgets/Loader";
import UserProfileSidebar from "../UserProfileSidebar";
// import 'moment/locale/ar-sa'; // Import locale data for Saudi Arabia

const UserProfileSection = () => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationChecked, setIsNotificationChecked] = useState(false);
  const [isTvChecked, setIsTvChecked] = useState(false);
  const [isPricesChecked, setIsPricesChecked] = useState(false);
  const [isSecondFeatureModalOpen, setIsSecondFeatureModalOpen] =
    useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [deactivateAlert, setDeactivateAlert] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    countryCode: "+966",
    expirationDate: null,
  });
  const [firstType, setFirstType] = useState(null);
  const [plan, setPlan] = useState("");
  const [originalSubscriptionDetails, setOriginalSubscriptionDetails] =
    useState({ subscriptionType: "free", subscriptionPeriod: "monthly" });
  const [apiRange, setApiRange] = useState("1d");

  const [isAuthenticate, setIsAuthenticate] = useState(false);
  useEffect(() => {
    setIsAuthenticate(isAuthenticated());
  }, []);

  const pathname = usePathname();

  
  // moment.locale('ar-sa'); // Set the locale to 'ar-sa'
  const currentDay = moment().format('dddd');

  console.log(currentDay, "currentDay")


  useEffect(() => {
    // This effect runs once on component mount to fetch the user data
    const fetchUserData = async () => {
      const response = await apiCall("/auth/api/user/");
      const data = response.result;
      if (data) {
        const { countryCode, phoneNumber } = extractCountryCodeFromPhoneNumber(
          data.phoneNumber
        );
        setUserData({
          name: data.fullName || "",
          phoneNumber: phoneNumber || "",
          email: data.email || "",
          countryCode: countryCode,
          expirationDate: data.expirationDate || null,
        });
        console.log(response.result, "hello data");
        setOriginalSubscriptionDetails({
          subscriptionType: data.subscriptionType || "free",
          subscriptionPeriod: data.subscriptionPeriod || "monthly",
        });
        setFirstType(data.subscriptionType);
      }
    };

    fetchUserData();
  }, []);

  // let [page, setPage] = useState({
  //   name: "userprofile",
  //   value: "الخدمات الرئىيسية",
  // });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const storedPage =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("page"));

  let [page, setPage] = useState(
    storedPage || {
      name: "userprofile",
      value: "الخدمات الرئىيسية",
    }
  );

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && storedPage && page !== storedPage) {
  //     setPage(storedPage);
  // }
  // }, [storedPage]);

  useEffect(() => {
    handlePageChange(
      page.name == "payment"
        ? { name: "my-account", value: "باقتي وحسابي" }
        : {
            name: "userprofile",
            value: "الخدمات الرئىيسية",
          }
    );
    addEventListener("popstate", () => {
      const userprofilePage =
        page.name == "payment"
          ? { name: "my-account", value: "باقتي وحسابي" }
          : {
              name: "userprofile",
              value: "الخدمات الرئىيسية",
            };
      const cleanPage = cleanCircularReferences(userprofilePage);
      const serializedPage = JSON.stringify(cleanPage);

      if (pathname === "/userprofile") {
        router.push("/userprofile");
        localStorage.setItem("page", serializedPage);
      }
    });
  }, [pathname]);

  useEffect(() => {
    const cleanPage = cleanCircularReferences(page);
    const serializedPage = JSON.stringify(cleanPage);

    if (serializedPage.name == "userprofile") {
      isAuthenticate == true
        ? router.push("/userprofile")
        : router.push("/auth/login");
      localStorage.setItem("page", serializedPage);
    } else {
      localStorage.setItem("page", serializedPage);
    }
  }, [page]);

  function cleanCircularReferences(obj) {
    const seen = new WeakSet();
    return JSON.parse(
      JSON.stringify(obj, (key, value) => {
        // Skip React components
        if (React.isValidElement(value)) {
          return undefined;
        }

        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return undefined; // Exclude circular references
          }
          seen.add(value);
        }
        return value;
      })
    );
  }

  const handleNotificationSwitch = () => {
    setIsNotificationChecked((prevChecked) => !prevChecked);
    isNotificationChecked == false
      ? setSuccessAlert(true)
      : setDeactivateAlert(true);
  };

  const handleTvSwitch = () => {
    setIsTvChecked((prevChecked) => !prevChecked);
    isTvChecked == false ? setSuccessAlert(true) : setDeactivateAlert(true);
  };

  const list = [
    {
      title: "خدمة إشعارات الأسهم",
      desc: "يمكنك التحكم بإشعارات الواتساب وإدارتها",
      icon: (
        <Image
          loading="eager"
          src="/assets/icons/message-glow-icon.svg"
          width={85}
          height={85}
          alt="img"
          priority
        />
      ),
      page: { name: "stock-notification", value: "خدمة إشعارات الأسهم" },
    },
    {
      title: " الأسعار المستهدفة للأسهم",
      desc: "يمكنك التحكم بإشعارات الواتساب وإدارتها",
      icon: (
        <Image
          loading="eager"
          src="/assets/icons/point-glow-icon.svg"
          width={85}
          height={85}
          alt="img"
          priority
        />
      ),
      page: { name: "target-prices", value: "الأسعار المستهدفة للأسهم" },
    },
    {
      title: "تقارير أسهمي الاسبوعية",
      desc: "مشاهدة التقرير الاسبوعي لأسهمي",
      icon: (
        <Image
          loading="eager"
          src="/assets/icons/progress-glow-icon.svg"
          width={85}
          height={85}
          alt="img"
          priority
        />
      ),
      page: { name: "weekly-stock", value: "تقارير أسهمي الاسبوعية" },
    },
    {
      title: "باقتي وحسابي",
      desc: "تفاصيل باقتك والحساب الخاص بك",
      icon: (
        <Image
          loading="eager"
          src="/assets/icons/profile-glow-icon.svg"
          width={85}
          height={85}
          alt="img"
          priority
        />
      ),
      page: { name: "my-account", value: "باقتي وحسابي" },
    },
  ];

  const handlePageChange = (newPage) => {
    const { name, value } = newPage;
    setPage({ name, value });
  };

  const handlePlanChange = (newPlan) => {
    setPlan(newPlan);
  };

  const handlePricesSwitch = () => {
    setIsPricesChecked((prevChecked) => !prevChecked);
    isPricesChecked == false ? setSuccessAlert(true) : setDeactivateAlert(true);
  };

  const frequencies = [
    { value: "monthly", label: "شهري", priceSuffix: "/شهري" },
    { value: "annually", label: "سنوي", priceSuffix: "/سنوي" },
  ];

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
    subscriptionTypeMap[originalSubscriptionDetails?.subscriptionType]
    // ||
    // subscriptionTypeMap.free
  );
  const [frequency, setFrequency] = useState(
    subscriptionPeriodMap[originalSubscriptionDetails?.subscriptionPeriod]
    // ||
    // frequencies[0]
  );

  const [currentPlan, setCurrentPlan] = useState(
    subscriptionTypeMap[originalSubscriptionDetails?.subscriptionType]
    // ||
    // subscriptionTypeMap.free
  );

  const [currentPlanDuration, setCurrentPlanDuration] = useState(
    subscriptionPeriodMap[originalSubscriptionDetails?.subscriptionPeriod] ||
      frequencies[0]
  );

  console.log(
    subscriptionTypeMap[originalSubscriptionDetails?.subscriptionType],
    "hello"
  );

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
    localStorage.setItem("currentPlan", serializedData);
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
    localStorage.setItem("currentPlanDuration", serializedData);
    setCurrentPlanDuration(data);
    // setFrequency(data);
  };

  useEffect(() => {
    handleUpgardPlanDuration(
      subscriptionPeriodMap[originalSubscriptionDetails?.subscriptionPeriod] ||
        frequencies[0]
    );
    handleUpgradPlan(currentPlan);
  }, [originalSubscriptionDetails]);

  // const [activeStat, setActiveStat] = useState("TASI");
  const [activeStat, setActiveStat] = useState("TASI");
  const [activeStatistics, setActiveStatistics] = useState("general_view");
  const [activeChartTag, setActiveChartTag] = useState("يوم");
  const [oneDayChartTag, setOneDayChartTag] = useState(true);
  const [fiveDayChartTag, setFiveDayChartTag] = useState(false);
  const [oneMonthChartTag, setOneMonthChartTag] = useState(false);
  const [sixMonthChartTag, setSixMonthChartTag] = useState(false);
  const [oneYearChartTag, setOneYearChartTag] = useState(false);
  const [yearsChartTag, setYearsChartTag] = useState(false);
  const [maxChartTag, setMaxChartTag] = useState(false);
  const [tagsList, setTagsList] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [chartData, setChartData] = useState([]);

  const [chartLoading, setChartLoading] = useState(false);
  const [lastUpdatedDates, setLastUpdatedDates] = useState("");

  const [stockProfileData, setStockProfileData] = useState([]);

  const chartTagsList = [
    {
      id: 1,
      name: "يوم",
      apiRange: "1d",
    },
    {
      id: 2,
      name: "5 أيام",
      apiRange: "5d",
    },
    {
      id: 3,
      name: "شهر",
      apiRange: "1mo",
    },
    {
      id: 4,
      name: "6 أشهر",
      apiRange: "6mo",
    },
    {
      id: 5,
      name: "سنة",
      apiRange: "1y",
    },
    {
      id: 6,
      name: "العام حتى الآن",
      apiRange: "ytd",
    },
    {
      id: 7,
      name: "الحد الأقصى",
      apiRange: "max",
    },
  ];

  useEffect(() => {
    // Function to fetch user stocks data
    const fetchUserStocks = async () => {
      try {
        const response = await apiCall("/api/stocks/user-stocks/");
        console.log(response.result, "hello stock");
        if (response && response.result.results) {
          setLastUpdatedDates(response.result.last_updated_date);
          setTagsList(response.result.results); // Update state with the fetched data
        }
      } catch (error) {
        console.error("Error fetching user stocks:", error.message);
      }
      try {
        const response = await apiCall("/api/stocks/user-stocks-profile/");
        // console.log(response, "hello stock")
        if (response && response.result) {
          console.log(response, "hello api too");
          setStockProfileData(response.result);
        }
      } catch (error) {
        console.error("Error fetching user stocks:", error.message);
      }
    };

    fetchUserStocks();
    handleTagClick(apiRange, activeStat);
  }, []);

  const handleTagClick = async (range, symbol) => {
    if (symbol) {
      setChartLoading(true);
      const response = await apiCall(
        `/api/stocks/historical_data/?symbol=${symbol}.SR&range=${range}`
      );
      if (response && response.result) {
        // Update your state with the new data
        console.log(
          response.result[response.result?.length - 1]?.uv,
          "hello chart"
        );

        if (range == "1d") {
          let transformedData;
          if (response.result[0].uv == "0") {
            // let removeFirstZeroObject = response.result.slice(1);
            // setChartData(removeFirstZeroObject);
            transformedData = response.result.slice(1);
          } else {
            // setChartData(response.result);
            transformedData = response.result;
          }
          const formattedData = transformedData.map((entry) => {
            const dateObject = new Date(entry.name);
            const hours = dateObject.getHours();
            const minutes = dateObject.getMinutes();
            const time = `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}`;
            return { ...entry, name: time };
          });

          setChartData(formattedData);
        } else {
          if (response.result[0].uv == "0") {
            let removeFirstZeroObject = response.result.slice(1);
            setChartData(removeFirstZeroObject);
          } else {
            setChartData(response.result);
          }
        }
        setChartLoading(false);
      }
    }
  };

  const statisticsData = [
    "نظرة عامة",
    "الصفقات",
    "القوائم المالية",
    "المعلومات الأساسية",
  ];

  function isOpen(openTime, closeTime, timezone) {
    // handle special case
    if (openTime === "24HR") {
      return "open";
    }

    // get the current date and time in the given time zone
    const now = moment.tz(timezone);

    const currentDayOfWeek = now.day();

    if (currentDayOfWeek === 5 || currentDayOfWeek === 6) {
      return "closed";
    }
    
    // Get the exact open and close times on that date in the given time zone
    // See https://github.com/moment/moment-timezone/issues/119
    const date = now.format("YYYY-MM-DD");
    const storeOpenTime = moment.tz(
      date + " " + openTime,
      "YYYY-MM-DD h:mmA",
      timezone
    );
    const storeCloseTime = moment.tz(
      date + " " + closeTime,
      "YYYY-MM-DD h:mmA",
      timezone
    );

    let check;
    if (storeCloseTime.isBefore(storeOpenTime)) {
      // Handle ranges that span over midnight
      check = now.isAfter(storeOpenTime) || now.isBefore(storeCloseTime);
    } else {
      // Normal range check using an inclusive start time and exclusive end time
      check = now.isBetween(storeOpenTime, storeCloseTime, null, "[)");
    }

    return check ? "open" : "closed";
  }

  const zone = "Asia/Riyadh";

  console.log(chartData, "hello here");

  return (
    <div>
      {typeof window == "undefined" && userData.name == "" ? (
        ""
      ) : (
        <>
          <DarkNavOverlay
            successAlert={successAlert}
            setSuccessAlert={setSuccessAlert}
            deactivateAlert={deactivateAlert}
            setDeactivateAlert={setDeactivateAlert}
            page={page}
            setPage={setPage}
            toggleSidebar={toggleSidebar}
            name={userData.name}
          >
            <MainSidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              toggleSidebar={toggleSidebar}
              content={
                <UserProfileSidebar
                  handlePageChange={handlePageChange}
                  toggleSidebar={toggleSidebar}
                  list={list}
                />
              }
            />
            {page.name == "userprofile" ? (
              <div className="space-y-6 translation duration-500 ease-in-out">
                <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                  {list.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handlePageChange(item.page)}
                      >
                        <ArrowList
                          leftIcon={
                            <Image
                              loading="eager"
                              src="/assets/icons/arrow-right.svg"
                              width={8}
                              height={8}
                              alt="img"
                              className="group-hover:opacity-100 opacity-20 me-4"
                              priority
                            />
                          }
                          title={item.title}
                          desc={item.desc}
                          icon={item.icon}
                          bgColor={item.bgColor}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="w-full bg-[#F5F7F9] pt-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                  <div className="flex items-end mb-5">
                    <div className="text-2xl font-medium leading-none m-2">
                      الأسهم
                    </div>
                    {/* {isOpen("10:00AM", "3:00PM", zone) == "open" ? (
                                        ) : "" } */}
                    {originalSubscriptionDetails?.subscriptionType == "free" ? (
                      <DotBadgeUI
                        title="الأسعار متأخرة 15 دقيقة"
                        badgeStyle="bg-whiteColor shadow-xl text-yellowColor"
                        dotStyle="fill-yellowColor"
                        isDot={true}
                      />
                    ) : (
                      <DotBadgeUI
                        title="الأسعار مباشرة"
                        badgeStyle="bg-whiteColor shadow-xl text-lightRedColor"
                        dotStyle="fill-lightRedColor"
                        isDot={true}
                      />
                    )}
                    {isOpen("10:00AM", "3:00PM", zone) == "open" ? (
                      <DotBadgeUI
                        title="السوق مفتوح"
                        badgeStyle="bg-whiteColor mr-2 shadow-xl text-primaryColor"
                        dotStyle="fill-primaryColor"
                        isDot={false}
                      />
                    ) : (
                      <DotBadgeUI
                        title="السوق مغلق"
                        badgeStyle="bg-whiteColor mr-2 shadow-xl text-lightRedColor"
                        dotStyle="fill-lightRedColor"
                        isDot={false}
                      />
                    )}
                  </div>
                  <UserProfileStatistics
                    setStockProfileData={setStockProfileData}
                    stockProfileData={stockProfileData}
                    apiRange={apiRange}
                    setApiRange={setApiRange}
                    chartLoading={chartLoading}
                    statisticsData={statisticsData}
                    tagsList={tagsList}
                    chartTagsList={chartTagsList}
                    lastUpdatedDates={lastUpdatedDates}
                    chartData={chartData}
                    setSelectedSymbol={setSelectedSymbol}
                    setActiveStat={setActiveStat}
                    activeStat={activeStat}
                    selectedSymbol={selectedSymbol}
                    activeChartTag={activeChartTag}
                    setActiveChartTag={setActiveChartTag}
                    handleTagClick={handleTagClick}
                    setActiveStatistics={setActiveStatistics}
                    activeStatistics={activeStatistics}
                  />
                </div>
              </div>
            ) : page.name == "stock-notification" ? (
              <UserProfileFeatureOne
                originalSubscriptionDetails={originalSubscriptionDetails}
                isNotificationChecked={isNotificationChecked}
                handleNotificationSwitch={handleNotificationSwitch}
                handleTvSwitch={handleTvSwitch}
                isTvChecked={isTvChecked}
              />
            ) : page.name == "target-prices" ? (
              <UserProfileFeatureTwo
                setIsSecondFeatureModalOpen={setIsSecondFeatureModalOpen}
                isSecondFeatureModalOpen={isSecondFeatureModalOpen}
                handlePricesSwitch={handlePricesSwitch}
                isPricesChecked={isPricesChecked}
              />
            ) : page.name == "weekly-stock" ? (
              <div className="space-y-6">
                <div className="w-full bg-[#F5F7F9] pt-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                  <UserProfileFeatureThree />
                </div>
              </div>
            ) : page.name == "my-account" ? (
              <div className="space-y-6">
                <div className="w-full bg-[#F5F7F9] py-4 px-4 rounded-3xl space-y-4 border border-gray-300">
                  <UserProfileFeatureFour
                    handlePageChange={handlePageChange}
                    handlePlanChange={handlePlanChange}
                    plan={plan}
                    userData={userData}
                    setUserData={setUserData}
                    setOriginalSubscriptionDetails={
                      setOriginalSubscriptionDetails
                    }
                    originalSubscriptionDetails={originalSubscriptionDetails}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    frequency={frequency}
                    setFrequency={setFrequency}
                    subscriptionTypeMap={subscriptionTypeMap}
                    subscriptionPeriodMap={subscriptionPeriodMap}
                    handleUpgradPlan={handleUpgradPlan}
                    setCurrentPlan={setCurrentPlan}
                    currentPlan={currentPlan}
                    handleUpgardPlanDuration={handleUpgardPlanDuration}
                    setCurrentPlanDuration={setCurrentPlanDuration}
                    currentPlanDuration={currentPlanDuration}
                  />
                </div>
              </div>
            ) : page.name == "payment" ? (
              <div className="space-y-6">
                <OrderSummaryForm
                  handlePageChange={handlePageChange}
                  handlePlanChange={handlePlanChange}
                  plan={plan}
                  userData={userData}
                  setUserData={setUserData}
                  setOriginalSubscriptionDetails={
                    setOriginalSubscriptionDetails
                  }
                  originalSubscriptionDetails={originalSubscriptionDetails}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  frequency={frequency}
                  setFrequency={setFrequency}
                  subscriptionTypeMap={subscriptionTypeMap}
                  subscriptionPeriodMap={subscriptionPeriodMap}
                  handleUpgradPlan={handleUpgradPlan}
                  // currentDuration={currentPlanDuration}
                  currentDuration={
                    subscriptionPeriodMap[
                      originalSubscriptionDetails?.subscriptionPeriod
                    ] || frequencies[0]
                  }
                  setCurrentPlanDuration={setCurrentPlanDuration}
                />
              </div>
            ) : (
              ""
            )}
          </DarkNavOverlay>
          <div>
            <ProfileFooter name={userData.name} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileSection;
