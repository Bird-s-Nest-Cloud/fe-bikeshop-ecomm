import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 50000,
});

// Add a request interceptor to set the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("user_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
       console.error("API error response:", error.response);
      if(error.response.status === 401) {
        Cookies.remove("user_token");
         // window.location.reload();
        console.warn('Unauthorized! Token has been deleted.');
      }
    } else if (error.request) {
      console.error("API no response:", error.request);
    } else {
      console.error("API request error:", error.message);
    }
    return Promise.reject(error);
  },
);

export { axiosInstance };