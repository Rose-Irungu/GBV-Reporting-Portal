import api from './api';
import { API_ENDPOINTS } from "../utils/constants";
import toast from 'react-hot-toast';


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
  delete_user: async (user_id) => {
    try {
      const promise = api.delete(`${API_ENDPOINTS.DELETE_USER}?user_id=${user_id}`);
      const response = await toast.promise(promise, {
        loading: "Deleting user...",
        success: "User deleted successfully!",
        error: (err) =>
          err?.response?.data?.message || "User deletion failed. Please try again.",
      })
      return response.data;
    } catch (error) {
      console.error("Error during delete user:", error);
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


  logoutUser: async () => {
    try {
      // const promise = api.post(API_ENDPOINTS.LOG_OUT, { "action": "logout_current_device"});
      // const res = await toast.promise(promise, {
      //   loading: "Logging out...",
      //   success: "Logout successful.",
      //   error: (err) =>
      //     err?.response?.data?.message || "Logout failed. Please try again.",
      // });
      // if (res.status === 200) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userRole");
      window.location.href = "/login";
      // } else {
      //   console.error("Logout failed:", res.data);
      //   toast.error("Logout failed. Please try again.");
      // }
    } catch (error) {
      // toast.error("Logout failed. Please try again.");
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

  addUser: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ADD_USER, userData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "User creation failed. Please try again.",
        }
      );
    }
  },

  allUsers: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ALL_USERS);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Fetching users failed. Please try again.",
        }
      );
    }
  },
  updateUser: async (userId, userData) => {
    try {
      const promise = api.put(`${API_ENDPOINTS.ALL_USERS}?user_id=${userId}`, userData);
      const response = await toast.promise(promise, {
        loading: "Updating user...",
        success: "User updated successfully!",
        error: (err) =>
          err?.response?.data?.message || "Updating user failed. Please try again.",
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data.detail || {
          message: "Updating user failed. Please try again.",
        }
      );
    }
  },
};

