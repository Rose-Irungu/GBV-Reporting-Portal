import api from './api';
import { API_ENDPOINTS } from "../utils/constants";


export const authService = {
  sent_password_reset: async (formData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.SENT_PASSWORD_RESET,
        formData
      );
    
      return response.data;
    } catch (error) {
      console.error("Error during sent email:", error);
      throw error;
    }
  },
  password_reset: async (formData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.SENT_PASSWORD_RESET,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error during reset password:", error);
      throw error;
    }
  },
  loginUser: async (credentials) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, credentials);

      // const response = await toast.promise(promise, {
      //   loading: "Logging in...",
      //   success: "Login successful!",
      //   error: (err) =>
      //     err?.response?.data?.message || "Login failed. Please try again.",
      // });
// console.log("Login response:", response.data);
// return
      return response.data;
    } catch (error) {
      throw (
        error?.response?.data || { message: "Login failed. Please try again." }
      );
    }
  },


  logoutUser: async() => {
    try {
      const promise = api.post(API_ENDPOINTS.LOG_OUT, { "action": "logout_current_device"});
      const res = await toast.promise(promise, {
        loading: "Logging out...",
        success: "Logout successful.",
        error: (err) =>
          err?.response?.data?.message || "Logout failed. Please try again.",
      });
      if (res.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userRole");
        window.location.href = "/loginform";
      } else {
        console.error("Logout failed:", res.data);
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Error during logout:", error);
    }
    
  },

  changePassword: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.CHANGE_PASSWORD, formData);

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Password change failed. Please try again.",
        }
      );
    }
  },
};

