// Function to combine countryCode and phoneNumber
export const getFullPhoneNumber = (userData) => {
    if (!userData || !userData.countryCode || !userData.phoneNumber) {
        return ""; // Return empty string or handle as you see fit
    }

    // Remove '+' from countryCode and combine
    const fullNumber = `${userData.countryCode.replace("+", "")}${userData.phoneNumber
        }`;
    return fullNumber;
};

export const mergeKeysIntoThird = (userData, firstKey, secondKey, thirdKey) => {
    // Check if userData is an object and firstKey & secondKey exist in userData
    if (
        !userData ||
        typeof userData !== "object" ||
        !userData[firstKey] ||
        !userData[secondKey]
    ) {
        return userData; // Return userData as it is
    }

    // Concatenate firstKey and secondKey values and assign to thirdKey
    userData[thirdKey] = `${userData[firstKey]} ${userData[secondKey]}`;

    return userData; // Return the modified userData
};

export const isAuthenticated = (router) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // Redirect to login if tokens are not present
    if (!accessToken || !refreshToken) {
        return false;
    }
    // If tokens exist, nothing happens (the function simply ends)
    return true;
};

export const extractCountryCodeFromPhoneNumber = (phoneNumber) => {
    const countryCodes = ["966", "965", "971", "973", "974", "968", "962", "92"];
    for (const code of countryCodes) {
        if (phoneNumber && phoneNumber.startsWith(code)) {
            return {
                countryCode: code,
                phoneNumber: phoneNumber.slice(code.length).replace(/^0+/, ""),
            };
        }
    }
    return { countryCode: "", phoneNumber: phoneNumber };
};

// A helper function to ensure uniqueness by the symbol property
export const getUniqueStocksBySymbol = (stocks) => {
    const unique = {};
    stocks.forEach((stock) => {
        unique[stock.symbol] = stock; // Overwrites any duplicate symbol
    });
    return Object.values(unique);
};
