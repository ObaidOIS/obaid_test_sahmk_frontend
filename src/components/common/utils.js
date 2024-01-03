// Function to combine countryCode and phoneNumber
export const getFullPhoneNumber = (userData) => {
    if (!userData || !userData.countryCode || !userData.phoneNumber) {
        return ''; // Return empty string or handle as you see fit
    }

    // Remove '+' from countryCode and combine
    const fullNumber = `${userData.countryCode.replace('+', '')}${userData.phoneNumber}`;
    return fullNumber;
};


export const mergeKeysIntoThird = (userData, firstKey, secondKey, thirdKey) => {
    // Check if userData is an object and firstKey & secondKey exist in userData
    if (!userData || typeof userData !== 'object' || !userData[firstKey] || !userData[secondKey]) {
        return userData; // Return userData as it is
    }

    // Concatenate firstKey and secondKey values and assign to thirdKey
    userData[thirdKey] = `${userData[firstKey]}${userData[secondKey]}`;

    return userData; // Return the modified userData
};



export const checkAndRedirectIfNotAuthenticated = (router) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Redirect to login if tokens are not present
    if (!accessToken || !refreshToken) {
        router.push('/auth/login');
    }
    // If tokens exist, nothing happens (the function simply ends)
};
