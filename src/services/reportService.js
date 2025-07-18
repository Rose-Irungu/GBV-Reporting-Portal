import api from './api';
import { API_ENDPOINTS } from "../utils/constants";

export const submitReport = async (formData) => {
  const response = await api.post(API_ENDPOINTS.SUBMIT_REPORT, formData);
  return response.data;
};
