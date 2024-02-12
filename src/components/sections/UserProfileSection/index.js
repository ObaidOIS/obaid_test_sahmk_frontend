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
        setIsNotificationChecked(data.receive_opening_closing_prices);
        setIsTvChecked(data.weekly_report_enabled);
        setIsPricesChecked(data.target_prices_enabled);
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
    console.log(pathname, page.name, "pathname change");

    // handlePageChange(

    //   page.name == "payment"
    //     ? { name: "my-account", value: "باقتي وحسابي" }
    //     : {
    //         name: "userprofile",
    //         value: "الخدمات الرئىيسية",
    //       }
    // );

    // addEventListener("popstate", () => {
    //   const userprofilePage =
    //     page.name == "payment"
    //       ? { name: "my-account", value: "باقتي وحسابي" }
    //       : {
    //           name: "userprofile",
    //           value: "الخدمات الرئىيسية",
    //         };
    //   const cleanPage = cleanCircularReferences(userprofilePage);
    //   const serializedPage = JSON.stringify(cleanPage);

    //   if (pathname === "/userprofile") {
    //     router.push("/userprofile");
    //     localStorage.setItem("page", serializedPage);
    //   }
    // });

    addEventListener("popstate", (e) => {
      let userprofilePage = "";

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
  }, [page.name]);

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
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [chartData, setChartData] = useState([]);

  const [chartLoading, setChartLoading] = useState(false);
  const [lastUpdatedDates, setLastUpdatedDates] = useState("");

  const [stockProfileData, setStockProfileData] = useState([]);

  const [selectedStatCurrentValue, setSelectedStatCurrentValue] = useState("");

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
  ] = useState({});

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

  useEffect(() => {
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
    fetchStocks();
  }, []);

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
        if (originalSubscriptionDetails?.subscriptionType == "free") {
          setErrorAlert(true);
          setErrorMessage("يرجى ترقية خطتك لإضافة الشركات");
          isError = true;
        }
        if (
          originalSubscriptionDetails?.subscriptionType == "premium" &&
          selectedItems.length + 1 > 10
        ) {
          setErrorAlert(true);
          setErrorMessage(
            "لا يمكن إضافة المزيد، يرجى ترقية خطتك لإضافة 50 شركة."
          );
          // setErrorButton("")
          isError = true;
        }
        if (
          originalSubscriptionDetails?.subscriptionType == "companies" &&
          selectedItems.length + 1 > 50
        ) {
          setErrorAlert(true);
          setErrorMessage("لا يمكن إضافة المزيد من الشركات.");
          isError = true;
        }
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
    const encodedMessage = encodeURIComponent('اعرضلي حسابي');
    window.open(`https://api.whatsapp.com/send/?phone=+966591254924&text=${encodedMessage}`, '_blank');

  }

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
                <div className="!mt-0 mb-4">
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
                </div>
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
                      {/* <div className="flex items-center justify-end flex-1">
                      <div
                        onClick={() => {
                          setSearchInputShow(!searchInputShow);
                        }}
                        // className={` `}
                      >
                        {searchInputShow ? (
                          <div className="bg-secondaryColor shadow-xl rounded-lg  cursor-pointer p-2">
                            <RxCross2 size={22} className=" text-whiteColor " />
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
                    </div> */}
                    </div>
                    {/* <div className="!m-0">
                      <>
                        <SelectUserCompaniesInput
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
                          selectedSymbol={setSelectedStockProfileCurrentValue}
                          stockProfileData={setSelectedStockProfileCurrentValue}
                          setSelectedStockProfileCurrentValue={
                            setSelectedStockProfileCurrentValue
                          }
                        />
                      </>
                  </div> */}
                    <UserProfileStatistics
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
                    />
                  </div>
                  <div className="!mt-0">
                    <HighLowStocksTables />
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
