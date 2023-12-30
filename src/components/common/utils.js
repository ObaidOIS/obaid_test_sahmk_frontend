// Function to combine countryCode and phoneNumber
export const getFullPhoneNumber = (userData) => {
    if (!userData || !userData.countryCode || !userData.phoneNumber) {
        return ''; // Return empty string or handle as you see fit
    }

    // Remove '+' from countryCode and combine
    const fullNumber = `${userData.countryCode.replace('+', '')}${userData.phoneNumber}`;
    return fullNumber;
};
