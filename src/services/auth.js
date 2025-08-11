import api from './api';
import { API_ENDPOINTS } from "../utils/constants";

export const signup = async (formData) => {
  const response = await api.post(API_ENDPOINTS.SIGN_UP, formData);
  return response.data;
};
export const login = async (formData) => {
  const response = await api.post(API_ENDPOINTS.LOGIN, formData);
  return response.data;
};
