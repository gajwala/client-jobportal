// src/utils/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://job-portal-five-orcin.vercel.app/api/v1", // Replace with your base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors globally if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;
