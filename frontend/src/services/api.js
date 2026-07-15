import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================
// Request Interceptor
// ======================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ======================================
// Response Interceptor
// ======================================

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      console.error("Backend is not reachable.");

      return Promise.reject({
        ...error,
        message: "Unable to connect to the server.",
      });
    }

    if (error.response.status === 401) {
      console.warn("Session expired.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;