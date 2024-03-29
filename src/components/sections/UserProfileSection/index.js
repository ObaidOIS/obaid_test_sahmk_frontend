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
import {
  extractCountryCodeFromPhoneNumber,
  getUniqueStocksBySymbol,
} from "@/components/common/utils";
import { isAuthenticated } from "@/components/common/utils";
import { useRouter } from "next/navigation";
import UserProfileStatistics from "../UserProfileStatistics";
import { usePathname } from "next/navigation";
import DotBadgeUI from "@/components/widgets/DotBadgeUI";
import moment from "moment-timezone";
import Loader from "@/components/widgets/Loader";
import UserProfileSidebar from "../UserProfileSidebar";
import SelectUserCompaniesInput from "../SelectUserCompaniesInput";
// import 'moment/locale/ar-sa'; // Import locale data for Saudi Arabia
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import HighLowStocksTables from "../HighLowStocksTables";
import StocksDetailsTable from "../StocksDetailsTable";

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
  const [selectedMarketSectorName, setSelectedMarketSectorName] =
    useState("Energy");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedMarket, setSelectedMarket] = useState("TASI");
  const [activeData, setActiveData] = useState([]);
  const [lowStocksData, setLowStocksData] = useState([]);
  const [highStocksData, setHighStocksData] = useState([]);
  const [stocksByValueData, setStocksByValueData] = useState([]);
  const [stocksByQuantityData, setStocksByQuantityData] = useState([]);
  const [stockDetailsSelectedMarket, setStockDetailsSelectedMarket] =
    useState("TASI");
  const [stockDetailsTableData, setStockDetailsTableData] = useState([]);

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
  const currentDay = moment().format("dddd");

  console.log(currentDay, "currentDay");

  const handleSubmitCheckboxes = async (
    receiveOpeningClosingPricesToggle,
    targetPriceToggle,
    weeklyReportToggle
  ) => {
    console.log(
      receiveOpeningClosingPricesToggle,
      targetPriceToggle,
      weeklyReportToggle,
      "checkbox"
    );
    const response = await apiCall(
      `/auth/api/user/update-user-preferences/`,
      "POST",
      {
        receive_opening_closing_prices: receiveOpeningClosingPricesToggle,
        target_prices_enabled: targetPriceToggle,
        weekly_report_enabled: weeklyReportToggle,
      }
    );
    if (response && response.result) {
      console.log(response, "checkbox");
    } else {
    }
  };

  const fetchUserData = async () => {
    const response = await apiCall("/auth/api/user/");
    const data = response.result;
    if (data) {
      console.log(data, "hello data");
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
      setIsNotificationChecked(data.receive_opening_closing_prices);
      setIsTvChecked(data.weekly_report_enabled);
      setIsPricesChecked(data.target_prices_enabled);
      console.log(data.subscriptionType, "hello data");
      setOriginalSubscriptionDetails({
        subscriptionType: data.subscriptionType || "free",
        subscriptionPeriod: data.subscriptionPeriod || "monthly",
      });
      setFirstType(data.subscriptionType);
    }
  };
  useEffect(() => {
    // This effect runs once on component mount to fetch the user data
    fetchUserData();
  }, []);

  const fakeStatsData = {
    financials: [
      { name: "صافي الدخل", value: 99 },
      { name: "إجمالي الإيرادات", value: 99 },
      { name: "الربح الإجمالي", value: 99 },
      { name: "إجمالي الصرف", value: 99 },
    ],
    fundamental_info: [
      { name: "القيمة السوقية", value: 99 },
      { name: "السعر الحالي", value: "52.10" },
      { name: "معدل التوزيع السنوي", value: 99 },
      { name: "نسبة السعر إلى الأرباح", value: "35.36" },
      { name: "نسبة السعر إلى القيمة الدفترية", value: 99 },
      { name: "تاريخ آخر توزيع", value: 99 },
    ],
    general_view: [
      { name: "سعر الافتتاح", value: "51.90" },
      { name: "نسبة التغير اليومي", value: "0.97" },
      { name: "أعلى سعر", value: "52.30" },
      { name: "أدنى سعر", value: "51.70" },
      { name: "حجم التداول", value: "2171" },
      { name: "القيمة السوقية", value: 99 },
    ],
    trades_info: [
      { name: "عدد الصفقات الداخلة", value: "28.00" },
      { name: "كمية التداولات الداخلة", value: "1587.00" },
      { name: "قيمة التداولات الداخلة", value: "82509.00" },
      { name: "عدد الصفقات الخارجة", value: "19.00" },
      { name: "كمية التداولات الخارجة", value: "584.00" },
      { name: "قيمة التداولات الخارجة", value: "30367.50" },
      { name: "متوسط عدد الصفقات لآخر خمسة أيام", value: 99 },
    ],
  };

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
    console.log(pathname, page.name, "pathname change");

    let userprofilePage = "";

    window.addEventListener("popstate", (e) => {
      let userprofilePage = "";
      console.log(e, "pathname");

      if (page.name == "payment") {
        handlePageChange({ name: "my-account", value: "باقتي وحسابي" });
        userprofilePage = { name: "my-account", value: "باقتي وحسابي" };
      }

      if (!e.persisted) {
        handlePageChange(
          page.name == "payment"
            ? { name: "my-account", value: "باقتي وحسابي" }
            : {
                name: "userprofile",
                value: "الخدمات الرئىيسية",
              }
        );

        userprofilePage =
          page.name == "payment"
            ? { name: "my-account", value: "باقتي وحسابي" }
            : {
                name: "userprofile",
                value: "الخدمات الرئىيسية",
              };
        // This is not a page refresh, handle your logic here
        console.log("Not a page refresh");
      } else {
        handlePageChange(
          (page.name == "stock-notification" && {
            name: "stock-notification",
            value: "خدمة إشعارات الأسهم",
          }) ||
            (page.name == "target-prices" && {
              name: "target-prices",
              value: "الأسعار المستهدفة للأسهم",
            }) ||
            (page.name == "weekly-stock" && {
              name: "weekly-stock",
              value: "تقارير أسهمي الاسبوعية",
            }) ||
            (page.name == "payment" && {
              name: "my-account",
              value: "باقتي وحسابي",
            }) ||
            (page.name == "my-account" && {
              name: "my-account",
              value: "باقتي وحسابي",
            }) ||
            (page.name == "userprofile" && {
              name: "userprofile",
              value: "الخدمات الرئىيسية",
            })
        );
        userprofilePage =
          (page.name == "stock-notification" && {
            name: "stock-notification",
            value: "خدمة إشعارات الأسهم",
          }) ||
          (page.name == "target-prices" && {
            name: "target-prices",
            value: "الأسعار المستهدفة للأسهم",
          }) ||
          (page.name == "weekly-stock" && {
            name: "weekly-stock",
            value: "تقارير أسهمي الاسبوعية",
          }) ||
          (page.name == "payment" && {
            name: "my-account",
            value: "باقتي وحسابي",
          }) ||
          (page.name == "my-account" && {
            name: "my-account",
            value: "باقتي وحسابي",
          }) ||
          (page.name == "userprofile" && {
            name: "userprofile",
            value: "الخدمات الرئىيسية",
          });
        // This is a page refresh, you can skip handling or do something else
        console.log("Page refresh");
      }

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
    setIsNotificationChecked((prevChecked) => {
      const receiveOpeningClosingPricesToggle = !prevChecked;
      handleSubmitCheckboxes(
        receiveOpeningClosingPricesToggle,
        isPricesChecked,
        isTvChecked
      );
      return receiveOpeningClosingPricesToggle;
    });

    isNotificationChecked == false
      ? setSuccessAlert(true)
      : setDeactivateAlert(true);
  };

  const handleTvSwitch = () => {
    setIsTvChecked((prevChecked) => {
      const weeklyReportToggle = !prevChecked;
      handleSubmitCheckboxes(
        isNotificationChecked,
        isPricesChecked,
        weeklyReportToggle
      );
      return weeklyReportToggle;
    });
    isTvChecked == false ? setSuccessAlert(true) : setDeactivateAlert(true);
  };

  const list = [
    {
      title: "خدمة إشعارات الأسهم",
      desc: "يمكنك التحكم بإشعارات الواتساب وإدارتها",
      icon: (
        <Image
          unoptimized={true}
          loading="eager"
          src="/assets/icons/message-glow-icon.svg"
          // src="/assets/icons/message-glow-icon.png"
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
          unoptimized={true}
          loading="eager"
          src="/assets/icons/point-glow-icon.svg"
          width={85}
          height={85}
          alt="img"
          priority
          // quality={75}
          // blurDataURL="/assets/icons/point-glow-icon.svg"
          // placeholder="blur"
        />
      ),
      page: { name: "target-prices", value: "الأسعار المستهدفة للأسهم" },
    },
    {
      title: "تقارير أسهمي الاسبوعية",
      desc: "مشاهدة التقرير الاسبوعي لأسهمي",
      icon: (
        <Image
          unoptimized={true}
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
          unoptimized={true}
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
    console.log(newPage, "pathname change in change function");
    const { name, value } = newPage;
    setPage({ name, value });
  };

  const handlePlanChange = (newPlan) => {
    setPlan(newPlan);
  };

  const handlePricesSwitch = () => {
    setIsPricesChecked((prevChecked) => {
      const targetPriceToggle = !prevChecked;
      handleSubmitCheckboxes(
        isNotificationChecked,
        targetPriceToggle,
        isTvChecked
      );
      return targetPriceToggle;
    });
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

    console.log(serializedData, "userData");
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
      subscriptionPeriodMap[originalSubscriptionDetails?.subscriptionPeriod]
      // || frequencies[0]
    );
    // handleUpgradPlan(currentPlan);
    handleUpgradPlan(
      subscriptionTypeMap[originalSubscriptionDetails?.subscriptionType]
    );
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
  const [selectedSymbol, setSelectedSymbol] = useState("TASI");
  const [chartData, setChartData] = useState([]);

  const [chartLoading, setChartLoading] = useState(false);
  const [lastUpdatedDates, setLastUpdatedDates] = useState("");

  const [stockProfileData, setStockProfileData] = useState([]);

  const [selectedStatCurrentValue, setSelectedStatCurrentValue] = useState("");
  const [currentSelectedValue, setCurrentSelectedValue] = useState("");

  const [searchInputShow, setSearchInputShow] = useState(false);

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

  const [
    selectedStockProfileCurrentValue,
    setSelectedStockProfileCurrentValue,
  ] = useState([]);

  useEffect(() => {
    // console.log(stockProfileData, selectedSymbol, "user-stock-profile-see")
    // if(typeof window !== 'undefined'){
    if (stockProfileData[selectedSymbol]) {
      console.log(
        stockProfileData[selectedSymbol],
        stockProfileData,
        "user-stock-profile"
      );
      setSelectedStockProfileCurrentValue(stockProfileData[selectedSymbol]);
      // }
    }
    // else{
    //   if(selectedSymbol == "TASI" || selectedSymbol == "NOMUC" ){

    //   }else{
    //     console.log("can find that symbol in user-stock-profile")
    //   }
    // }
  }, [selectedSymbol]);

  // Function to fetch user stocks data
  const fetchUserStocks = async () => {
    try {
      const response = await apiCall("/api/stocks/user-stocks/");
      console.log(response.result, "hello stock");
      if (response && response.result.results) {
        setLastUpdatedDates(response.result.last_updated_date);
        setTagsList(response.result.results); // Update state with the fetched data

        console.log(response.result.results, "here is data");
      }
    } catch (error) {
      console.error("Error fetching user stocks:", error.message);
    }
    // try {
    //   const response = await apiCall("/api/stocks/search-stock/",
    //   "POST",
    //   {
    //     search_query : selectedSymbol,
    //     subscription_type:  originalSubscriptionDetails?.subscriptionType,
    //   });
    //   // const response = await apiCall("/api/stocks/user-stocks-profile/");
    //   if (response && response.result) {
    //     console.log(response, "hello api too");
    //     // setStockProfileData(response.result);

    //   setActiveStat(response.result?.name || response.result?.symbol);
    //   setSelectedSymbol(response.result?.symbol);
    //   setStockProfileData({[response.result?.symbol]:
    //     {
    //       general_view: response.result?.general_view || {},
    //       trades_info: response.result?.trades_info || {},
    //       financials: response.result?.financials || {},
    //       fundamental_info: response.result?.fundamental_info || {},
    //     }});
    //   }
    // } catch (error) {
    //   console.error("Error fetching user stocks:", error.message);
    // }
  };

  useEffect(() => {
    fetchUserStocks();
    handleTagClick(apiRange, activeStat);
  }, [page, originalSubscriptionDetails?.subscriptionType]);

  useEffect(() => {
    handleStatisticsChange(selectedSymbol);
  }, [originalSubscriptionDetails?.subscriptionType]);

  const handleTagClick = async (range, symbol) => {
    if (symbol) {
      setChartLoading(true);
      const response = await apiCall(
        `/api/stocks/historical_data/?symbol=${symbol}.SR&range=${range}&subscription_type=${originalSubscriptionDetails?.subscriptionType}`
        // `/api/stocks/historical_data/?symbol=${symbol}.SR&range=${range}&subscription_type=${(currentPlan?.title ? currentPlan?.title : currentPlan == "الباقة المجانية" && "free") || (currentPlan?.title ? currentPlan?.title : currentPlan == "باقة بريميوم" && "premium") || (currentPlan?.title ? currentPlan?.title : currentPlan == "الباقة المتقدمة" && "companies") }`
      );
      if (response && response.result) {
        // Update your state with the new data
        console.log(
          response.result[response.result?.length - 1]?.uv,
          response.result[0].uv,
          "hello chart"
        );
        console.log(response.result, "hello chart");

        // Find the first and last values
        const firstValue = response.result[0].uv;
        const lastValue = response.result[response.result?.length - 1]?.uv;

        // Calculate the percentage change
        const percentageChange = ((lastValue - firstValue) / firstValue) * 100;

        // Determine if it's a positive or negative change
        const changeSign = percentageChange >= 0 ? "" : "-";

        // Add the sign to the percentage
        const formattedPercentageChange = `${changeSign}${Math.abs(
          percentageChange
        ).toFixed(2)}%`;

        console.log(
          firstValue,
          lastValue,
          percentageChange,
          formattedPercentageChange,
          "firstdata"
        );

        // Log the result
        console.log(`Percentage Change: ${formattedPercentageChange}`);

        setSelectedStatCurrentValue(formattedPercentageChange);

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

  const handleStatisticsChange = async (symbol) => {
    const response = await apiCall("/api/stocks/search-stock/", "POST", {
      search_query: symbol,
      subscription_type: originalSubscriptionDetails?.subscriptionType,
    });
    // const response = await apiCall("/api/stocks/user-stocks-profile/");
    // console.log(response, "hello stock")
    if (response && response.result) {
      console.log(
        response.result,
        symbol,
        selectedStockProfileCurrentValue,
        {
          [response.result?.symbol]: {
            general_view: response.result?.general_view || {},
            trades_info: response.result?.trades_info || {},
            financials: response.result?.financials || {},
            fundamental_info: response.result?.fundamental_info || {},
          },
        }[(response.result, symbol)],
        "hello api too"
      );
      // setStockProfileData(response.result);

      // setActiveStat(response.result?.name || response.result?.symbol);
      setSelectedSymbol(response.result?.symbol);
      setStockProfileData({
        [response.result?.symbol]: {
          general_view: response.result?.general_view || {},
          trades_info: response.result?.trades_info || {},
          financials: response.result?.financials || {},
          fundamental_info: response.result?.fundamental_info || {},
        },
      });
      // console.log(selectedStockProfileCurrentValue)
      setSelectedStockProfileCurrentValue(
        {
          [response.result?.symbol]: {
            general_view: response.result?.general_view || {},
            trades_info: response.result?.trades_info || {},
            financials: response.result?.financials || {},
            fundamental_info: response.result?.fundamental_info || {},
          },
        }[(response.result, symbol)]
      );
      // if (response.result[symbol]) {
      //   console.log(
      //     response.result[symbol],
      //     stockProfileData,
      //     "user-stock-profile"
      //   );
      //   setSelectedStockProfileCurrentValue(response.result[symbol]);
      // }
    } else {
      console.log("Error fetching user stocks:");
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
    console.log(currentDayOfWeek, "hello day");

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

  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successCompaniesAlert, setSuccessCompaniesAlert] = useState("");
  const [successCompaniesMessage, setSuccessCompaniesMessage] = useState("");

  // const [successMessage, setSuccessMessage] = useState("");

  // Fetch companies from API and set to both dataList and originalData
  const fetchStocks = async () => {
    const userStocksResponse = await apiCall("/api/stocks/");
    if (userStocksResponse.status === 200 && userStocksResponse.result) {
      const userStocks = userStocksResponse.result.stocks.map((stock) => ({
        id: stock.id,
        symbol: stock.symbol,
        target_price: stock.target_price,
        name: stock.stock_name,
        stock_price: stock.stock_price,
      }));
      // const userStocks = userStocksResponse.result.stocks.map((stock) => ({id: stock.id}));
      const uniqueUserStocks = getUniqueStocksBySymbol(userStocks);

      setSelectedItems(uniqueUserStocks);
    }

    const response = await apiCall("/api/stocks/get-stocks-list/");
    if (response.result) {
      const formattedData = response.result.map(({ symbol, first_name }) => ({
        id: symbol,
        name: first_name,
        symbol: symbol,
        stock_name: first_name,
      }));
      setFilteredData(formattedData);
      setOriginalData(formattedData); // Set original data here
    }
  };

  useEffect(() => {
    // Fetch user's stocks and available stocks
    console.log(page, "hello refresh");
    if (page.name == "userprofile") {
      fetchStocks();
    }
  }, [page.name]);

  const handlePopupSave = async (stocksArray) => {
    // Define the endpoint for updating stocks
    const endpoint = "/api/stocks/bulk-update/";

    // Create the data object to send in the request
    // const requestData = {
    //   stocks: popupStocks,
    // };
    const requestData = {
      stocks: stocksArray,
    };

    // Send a POST request using your custom apiCall function
    const response = await apiCall(endpoint, "POST", requestData);

    if (response.status === 200) {
      // Handle successful response
      setSuccessCompaniesAlert(true);
      setSuccessCompaniesMessage(response.result.result);

      // Update formPayload.stocks by merging with popupStocks
      fetchStocks();
    } else {
      // Handle error response
      setErrorAlert(true);
      setErrorMessage(response.error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = originalData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const AddCompanySelection = (itemId, itemName, itemSymbol) => {
    console.log(itemName, "itemName");

    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.some(
        (item) => item.symbol === itemSymbol
      );
      //   const isAlreadySelected = prevSelectedItems.some(
      //     (item) => item === itemObject
      // );

      let newSelectedItems;

      if (isAlreadySelected) {
        // fetchUserStocks();
        return prevSelectedItems;
        // Remove the item if it's already selected
        // newSelectedItems = prevSelectedItems.filter(
        //   (item) => item.symbol !== itemSymbol
        // );

        // // Update popupStocks similarly as selectedItems
        // // setPopupStocks(newSelectedItems);
        // handlePopupSave(newSelectedItems);
      } else {
        // Add the new item
        let isError = false;
        // if (originalSubscriptionDetails?.subscriptionType == "free") {
        //   setErrorAlert(true);
        //   setErrorMessage("يرجى ترقية خطتك لإضافة الشركات");
        //   isError = true;
        // }
        // if (
        //   originalSubscriptionDetails?.subscriptionType == "premium" &&
        //   selectedItems.length + 1 > 10
        // ) {
        //   setErrorAlert(true);
        //   setErrorMessage(
        //     "لا يمكن إضافة المزيد، يرجى ترقية خطتك لإضافة 50 شركة."
        //   );
        //   // setErrorButton("")
        //   isError = true;
        // }
        // if (
        //   originalSubscriptionDetails?.subscriptionType == "companies" &&
        //   selectedItems.length + 1 > 50
        // ) {
        //   setErrorAlert(true);
        //   setErrorMessage("لا يمكن إضافة المزيد من الشركات.");
        //   isError = true;
        // }
        if (!isError) {
          newSelectedItems = [
            ...prevSelectedItems,
            { id: itemId, name: itemName, symbol: itemSymbol },
          ];
          // Update popupStocks similarly as selectedItems
          // setPopupStocks(newSelectedItems);
          handlePopupSave(newSelectedItems);
          fetchUserStocks();
          // console.log("hello", "user-stock-profile")
          // setSelectedSymbol(itemSymbol);
          // if (stockProfileData[itemSymbol]) {
          //   console.log(
          //     stockProfileData[itemSymbol],
          //     stockProfileData,
          //     "user-stock-profile"
          //   );
          //   setSelectedStockProfileCurrentValue(stockProfileData[itemSymbol]);
          // }
        } else {
          newSelectedItems = [
            ...prevSelectedItems,
            // { id: itemId, name: itemName, symbol: itemSymbol },
          ];
          // fetchUserStocks();
          // setSelectedSymbol(itemSymbol);
          // handlePopupSave(newSelectedItems);
        }
      }

      // // Update popupStocks similarly as selectedItems
      // setPopupStocks(newSelectedItems);
      // handlePopupSave(newSelectedItems);

      return newSelectedItems;
    });
  };

  const handleOpenWhatsapp = () => {
    const encodedMessage = encodeURIComponent("اعرضلي حسابي");
    window.open(
      `https://api.whatsapp.com/send/?phone=+966591254924&text=${encodedMessage}`,
      "_blank"
    );
  };

  const handleHighStocksData = async (market, sector) => {
    const response = await apiCall(`/api/stocks/get-top-gainers/`, "POST", {
      index: market ? market : selectedMarket, // market_id
      sector: sector ? sector : selectedSector,
      subscription_type: originalSubscriptionDetails?.subscriptionType,
    });
    if (response && response.result) {
      console.log(response, "high stock data");
      setActiveData(response.result);
      setHighStocksData(response.result);
    } else {
      console.log("high stock data error");
    }
  };
  const handleLowStocksData = async (market, sector) => {
    const response = await apiCall(`/api/stocks/get-top-losers/`, "POST", {
      index: market ? market : selectedMarket, // market_id
      sector: sector ? sector : selectedSector,
      subscription_type: originalSubscriptionDetails?.subscriptionType,
    });
    if (response && response.result) {
      console.log(response, "low stock data");
      setActiveData(response.result);
      setLowStocksData(response.result);
    } else {
      console.log("low stock data error");
    }
  };

  const handleStocksByValueAndQuantity = async (type, market, sector) => {
    const response = await apiCall(
      `/api/stocks/get_top_volume_and_value_stocks/`,
      "POST",
      {
        index: market ? market : selectedMarket, // market_id
        sector: sector ? sector : selectedSector,
        subscription_type: originalSubscriptionDetails?.subscriptionType,
      }
    );
    if (response && response.result) {
      console.log(response, "quantity stock data");
      if (type == "quantity") {
        setActiveData(response.result.volumes);
        setStocksByQuantityData(response.result.volumes);
      }
      if (type == "value") {
        setActiveData(response.result.values);
        setStocksByValueData(response.result.values);
      }
      // stocksByValueAndQuantityData
    } else {
      console.log("high stock data error");
    }
  };

  const sectorsMarketNames = [
    { name: "TASI", arabic_name: "تاسي", type: "market" },
    { name: "NOMU", arabic_name: "سوق نمو", type: "market" },
    { name: "Energy", arabic_name: "الطاقة", type: "sector" },
    {
      name: "Diversified Financials",
      arabic_name: "الخدمات المالية",
      type: "sector",
    },
    {
      name: "Consumer Durables & Apparel",
      arabic_name: "السلع طويلة الأجل",
      type: "sector",
    },
    {
      name: "Consumer Services",
      arabic_name: "الخدمات الإستهلاكية",
      type: "sector",
    },
    {
      name: "Commercial & Professional Svc",
      arabic_name: "الخدمات التجارية والمهنية",
      type: "sector",
    },
    { name: "Capital Goods", arabic_name: "السلع الرأسمالية", type: "sector" },
    { name: "Banks", arabic_name: "البنوك", type: "sector" },
    {
      name: "Automobiles & Components",
      arabic_name: "السيارات والمكونات",
      type: "sector",
    },
    {
      name: "PharmaBiotech & Life Science",
      arabic_name: "الادوية",
      type: "sector",
    },
    { name: "Materials", arabic_name: "المواد الأساسية", type: "sector" },
    { name: "Media", arabic_name: "وسائل الإعلام", type: "sector" },
    { name: "Insurance", arabic_name: "التأمين", type: "sector" },
    {
      name: "Household & Personal Products",
      arabic_name: "منتجات الأسرة والشخصية",
      type: "sector",
    },
    {
      name: "Health Care Equipment & Svc",
      arabic_name: "الرعاية الصحية",
      type: "sector",
    },
    {
      name: "Food & Staples Retailing",
      arabic_name: "تجزئة السلع الكمالية",
      type: "sector",
    },
    { name: "Food & Beverages", arabic_name: "إنتاج الأغذية", type: "sector" },
    { name: "Utilities", arabic_name: "الخدمات العامة", type: "sector" },
    {
      name: "Telecommunication Services",
      arabic_name: "الإتصالات",
      type: "sector",
    },
    { name: "Transportation", arabic_name: "النقل", type: "sector" },
    {
      name: "Technology Hardware & Equip",
      arabic_name: "أجهزة التكنولوجيا والمعدات",
      type: "sector",
    },
    {
      name: "Software & Services",
      arabic_name: "التطبيقات وخدمات التقنية",
      type: "sector",
    },
    {
      name: "Semiconductors & Semiconductor Equip",
      arabic_name: "شرائح النصف الموصلة ومعداتها",
      type: "sector",
    },
    {
      name: "Real Estate Investment Trust",
      arabic_name: "الصناديق العقارية المتداولة",
      type: "sector",
    },
    {
      name: "Real Estate Mgmt & Development",
      arabic_name: "إدارة وتطوير العقارات",
      type: "sector",
    },
    { name: "Retailing", arabic_name: "التجزئة", type: "sector" },
    //  { name: "OTC Debt Securities", arabic_name: "الأوراق المالية خارج البورصة - الديون", type: "market" },
    //  { name: "OTC Equity Securities", arabic_name: "الأوراق المالية خارج البورصة - الأسهم", type: "market" },
    //  { name: "Options", arabic_name: "خيارات", type: "market" },
    //  { name: "Futures", arabic_name: "عقود الآجلة", type: "market" },
    //  { name: "Buy-In Debt Market", arabic_name: "سوق الديون بالشراء", type: "market" },
    //  { name: "Buy-In Equity Market", arabic_name: "سوق الأسهم بالشراء", type: "market" },
    //  { name: "Sukuk", arabic_name: "صكوك", type: "market" },
  ];

  // const handleSectorsMarketNames = async() => {

  //   const response = await apiCall(
  //     `/api/stocks/get-stock-sectors-market-names/`,
  //     "GET",
  //   );
  //   if (response && response.result) {
  //     console.log(response, "names stock data");
  //     setSectorsMarketNames(response.result)
  //     // stocksByValueAndQuantityData
  //   } else {
  //     console.log("high stock data error")
  //   }
  // }

  const [activeFilter, setActiveFilter] = useState("highest");

  const handleStockTableDetail = async (market) => {
    const response = await apiCall(
      `/api/stocks/get_stock_table_detail/`,
      "POST",
      {
        index: market ? market : stockDetailsSelectedMarket, // market_id
        subscription_type: originalSubscriptionDetails?.subscriptionType,
      }
    );
    if (response && response.result) {
      console.log(response, "high stock data");
      // setActiveData(response.result);
      // setStockDetailsSelectedMarket(response.result);
      setStockDetailsTableData(response.result);
    } else {
      console.log("high stock data error");
    }
  };

  useEffect(() => {
    console.log(currentPlan, "hello subscriptionType");
    handleHighStocksData(selectedMarket, selectedSector);
    handleStockTableDetail(stockDetailsSelectedMarket);
    localStorage.setItem("highlowTableTab", activeFilter);
    localStorage.setItem("highlowCurrentSector", selectedSector);
    localStorage.setItem("highlowCurrentMarket", selectedMarket);
    // handleLowStocksData();
    // handleStocksByValueAndQuantity();
    // handleSectorsMarketNames();
  }, [originalSubscriptionDetails?.subscriptionType]);

  const handleGlobalSearch = async (name) => {
    console.log(name, "search stock data");
    const response = await apiCall(`/api/stocks/search-stock/`, "POST", {
      search_query: name,
      subscription_type: originalSubscriptionDetails?.subscriptionType,
    });
    if (response && response.result) {
      console.log(response, "search stock data");
      handleTagClick(apiRange, response.result?.symbol);
      // handleTagClick(apiRange, item.stock_company);
      setActiveStat(response.result?.name || response.result?.symbol);
      setSelectedSymbol(response.result?.symbol);
      setStockProfileData({
        [response.result?.symbol]: {
          general_view: response.result?.general_view || {},
          trades_info: response.result?.trades_info || {},
          financials: response.result?.financials || {},
          fundamental_info: response.result?.fundamental_info || {},
        },
      });
      // setHighStocksData(response.result)
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    // Call the API initially

    // console.log(originalSubscriptionDetails?.subscriptionType, "hello current data")
    let intervalId = "";
    // Set up an interval to call the API every one minute (60,000 milliseconds)
    if (isOpen("10:00AM", "3:00PM", zone) == "open") {
      intervalId = setInterval((e) => {
        console.log(
          originalSubscriptionDetails?.subscriptionType,
          selectedMarket,
          selectedSector,
          selectedMarketSectorName,
          "hello current data"
        );
        // console.log(e, "console time")
        handleHighStocksData(selectedMarket, selectedSector);
        handleLowStocksData(selectedMarket, selectedSector);
        handleStocksByValueAndQuantity(
          "quantity",
          selectedMarket,
          selectedSector
        );
        handleStocksByValueAndQuantity("value", selectedMarket, selectedSector);
        handleStockTableDetail(stockDetailsSelectedMarket);
      }, 60000);
    }

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [selectedMarket, selectedSector]);

  const marketList = [
    { name: "TASI", arabic_name: "تاسي" },
    { name: "NOMU", arabic_name: "سوق نمو" },
  ];

  return (
    <div>
      {typeof window == "undefined" && userData.name == "" ? (
        ""
      ) : (
        <>
          <DarkNavOverlay
            successAlert={successAlert}
            // successMessage={successMessage}
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
              <>
                {/* <div className="!mt-0 mb-4">
                  <>
                    <SelectUserCompaniesInput
                      handleTagClick={handleTagClick}
                      setActiveStat={setActiveStat}
                      setSelectedSymbol={setSelectedSymbol}
                      apiRange={apiRange}
                      originalSubscriptionDetails={originalSubscriptionDetails}
                      searchQuery={searchQuery}
                      handleSearch={handleSearch}
                      filteredData={filteredData}
                      // filteredData={selectedItems}
                      dataList={filteredData}
                      AddCompanySelection={AddCompanySelection}
                      setSelectedItems={setSelectedItems}
                      selectedItems={selectedItems}
                      setErrorAlert={setErrorAlert}
                      setErrorMessage={setErrorMessage}
                      errorAlert={errorAlert}
                      errorMessage={errorMessage}
                      successCompaniesAlert={successCompaniesAlert}
                      successCompaniesMessage={successCompaniesMessage}
                      setSuccessCompaniesAlert={setSuccessCompaniesAlert}
                      selectedSymbol={setSelectedStockProfileCurrentValue}
                      stockProfileData={setSelectedStockProfileCurrentValue}
                      setSelectedStockProfileCurrentValue={
                        setSelectedStockProfileCurrentValue
                      }
                    />
                  </>
                </div> */}
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
                                unoptimized={true}
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
                  <div className="w-full bg-[#F5F7F9] pt-4 pb-8 px-4 rounded-3xl space-y-4 border border-gray-300">
                    <div className="flex">
                      <div className="flex items-end mb-3">
                        <div className="text-2xl font-medium leading-none m-2">
                          الأسهم
                        </div>
                        {/* {isOpen("10:00AM", "3:00PM", zone) == "open" ? (
                                        ) : "" } */}
                        {originalSubscriptionDetails?.subscriptionType ==
                        "free" ? (
                          <DotBadgeUI
                            title="الأسعار متأخرة 15 دقيقة"
                            badgeStyle="bg-whiteColor shadow-xl text-yellowColor"
                            dotStyle="fill-yellowColor"
                            isDot={true}
                          />
                        ) : (
                          <DotBadgeUI
                            title="الأسعار مباشرة"
                            badgeStyle="bg-whiteColor shadow-xl text-lightGreenColor"
                            dotStyle="fill-lightGreenColor"
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
                      <div className="flex items-center justify-end flex-1">
                        <div
                          onClick={() => {
                            setSearchInputShow(!searchInputShow);
                          }}
                          // className={` `}
                        >
                          {searchInputShow ? (
                            <div className="bg-secondaryColor shadow-xl rounded-lg  cursor-pointer p-2">
                              <RxCross2
                                size={22}
                                className=" text-whiteColor "
                              />
                            </div>
                          ) : (
                            <div className="bg-whiteColor shadow-xl rounded-lg  cursor-pointer p-2">
                              <FiSearch
                                size={22}
                                className="text-secondaryColor"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {searchInputShow == true ? (
                      <div className="!m-0">
                        <>
                          <SelectUserCompaniesInput
                            originalData={originalData}
                            setFilteredData={setFilteredData}
                            setSearchQuery={setSearchQuery}
                            currentSelectedValue={currentSelectedValue}
                            setCurrentSelectedValue={setCurrentSelectedValue}
                            handleGlobalSearch={handleGlobalSearch}
                            handleTagClick={handleTagClick}
                            setActiveStat={setActiveStat}
                            setSelectedSymbol={setSelectedSymbol}
                            apiRange={apiRange}
                            originalSubscriptionDetails={
                              originalSubscriptionDetails
                            }
                            searchQuery={searchQuery}
                            handleSearch={handleSearch}
                            filteredData={filteredData}
                            // filteredData={selectedItems}
                            dataList={filteredData}
                            AddCompanySelection={AddCompanySelection}
                            setSelectedItems={setSelectedItems}
                            selectedItems={selectedItems}
                            setErrorAlert={setErrorAlert}
                            setErrorMessage={setErrorMessage}
                            errorAlert={errorAlert}
                            errorMessage={errorMessage}
                            successCompaniesAlert={successCompaniesAlert}
                            successCompaniesMessage={successCompaniesMessage}
                            setSuccessCompaniesAlert={setSuccessCompaniesAlert}
                            selectedSymbol={selectedSymbol}
                            stockProfileData={stockProfileData}
                            // selectedSymbol={setSelectedStockProfileCurrentValue}
                            // stockProfileData={setSelectedStockProfileCurrentValue}
                            setSelectedStockProfileCurrentValue={
                              setSelectedStockProfileCurrentValue
                            }
                          />
                        </>
                      </div>
                    ) : (
                      ""
                    )}
                    <UserProfileStatistics
                      setFilteredData={setFilteredData}
                      originalData={originalData}
                      setSearchQuery={setSearchQuery}
                      // currentSelectedValue={currentSelectedValue}
                      setCurrentSelectedValue={setCurrentSelectedValue}
                      handleStatisticsChange={handleStatisticsChange}
                      fakeStatsData={fakeStatsData}
                      currentPlan={currentPlan}
                      selectedStockProfileCurrentValue={
                        selectedStockProfileCurrentValue
                      }
                      selectedStatCurrentValue={selectedStatCurrentValue}
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
                      handlePageChange={handlePageChange}
                    />
                  </div>
                  <div className="!mt-0">
                    <HighLowStocksTables
                      setActiveFilter={setActiveFilter}
                      activeFilter={activeFilter}
                      selectedSector={selectedSector}
                      selectedMarket={selectedMarket}
                      activeData={activeData}
                      highStocksData={highStocksData}
                      lowStocksData={lowStocksData}
                      stocksByQuantityData={stocksByQuantityData}
                      stocksByValueData={stocksByValueData}
                      setSelectedSector={setSelectedSector}
                      setSelectedMarket={setSelectedMarket}
                      handleHighStocksData={handleHighStocksData}
                      handleLowStocksData={handleLowStocksData}
                      handleStocksByValueAndQuantity={
                        handleStocksByValueAndQuantity
                      }
                      sectorsMarketNames={sectorsMarketNames}
                      setSelectedMarketSectorName={setSelectedMarketSectorName}
                      selectedMarketSectorName={selectedMarketSectorName}
                      handlePageChange={handlePageChange}
                      page={{ name: "my-account", value: "باقتي وحسابي" }}
                      currentPlan={currentPlan}
                    />
                  </div>

                  <div className="!mt-0">
                    <StocksDetailsTable
                      currentPlan={currentPlan}
                      list={marketList}
                      handleStockTableDetail={handleStockTableDetail}
                      activeStat={stockDetailsSelectedMarket}
                      setStockDetailsSelectedMarket={
                        setStockDetailsSelectedMarket
                      }
                      stockDetailsTableData={stockDetailsTableData}
                    />
                  </div>
                  <div className="w-full bg-[#F5F7F9] py-6 !mt-3 px-4 rounded-3xl space-y-4 border border-gray-300">
                    {/* <div className="w-full bg-[#F5F7F9] py-4 !mt-3 px-4 rounded-3xl space-y-4 border border-gray-300"> */}
                    <div
                      onClick={handleOpenWhatsapp}
                      className={` rounded-2xl mb-4 shadow-xl hover:shadow-2xl group cursor-pointer px-6 py-4 border border-whiteColor hover:border hover:border-secondaryColor bg-whiteColor`}
                    >
                      <div className="mx-auto inline-flex">
                        <span className="text-secondaryColor group-hover:text-primaryColor font-medium flex items-center whitespace-nowrap">
                          <Image
                            unoptimized={true}
                            loading="eager"
                            src="/assets/icons/whatsapp.svg"
                            width={30}
                            height={30}
                            className="ml-5"
                            alt="img"
                            priority
                          />
                          انتقل إلى محادثة النظام الذكي على الواتساب
                        </span>
                      </div>
                    </div>
                    <div className="font-medium text-right leading-none mx-2 my-12 ">
                      تحديث البيانات{" "}
                      <span className="font-normal text-gray-500/80">
                        اليوم الساعة {lastUpdatedDates}
                      </span>
                    </div>
                  </div>
                </div>
              </>
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
                originalSubscriptionDetails={originalSubscriptionDetails}
                // subscriptionType={subscriptionType}
                // selectedItems={selectedItems}
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
                    fetchUserData={fetchUserData}
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
                  page={page}
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
