// export const getUserInfo = () => {
//     try {
//         const userInfo = localStorage.getItem('userInfo');
//         return userInfo ? JSON.parse(userInfo) : null;
//     } catch (error) {
//         console.error('Error parsing user info:', error);
//         return null;
//     }
// };

// export const getUserRole = () => {
//     const userInfo = getUserInfo();
//     console.log(userInfo);
    
//     return userInfo?.role || null;
// };

// export const isAuthenticated = () => {
//     const userInfo = getUserInfo();
//     console.log(`--------------Here is info-------${userInfo.is_active}`);
    
//     return userInfo && userInfo.is_active;
// };