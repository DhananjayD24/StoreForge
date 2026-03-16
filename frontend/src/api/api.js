import axios from "axios";

// backend base URL
export const API_BASE_URL = "http://localhost:5000/api";

// frontend base URL (for store links)
export const FRONTEND_BASE_URL = window.location.origin;

const api = axios.create({
  baseURL: API_BASE_URL
});

// attach JWT automatically
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

export default api;