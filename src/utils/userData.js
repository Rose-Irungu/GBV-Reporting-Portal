const getUserFromStorage = () => {
    try {
        const userInfo = localStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
        return null;
    }
};

export default getUserFromStorage;