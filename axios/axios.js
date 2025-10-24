import axios from "axios";

//Axios instance for setting up base url automatically
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://therajwadasweets.com/nextupgrad/api",
  timeout: 25000, // Set a timeout
});

// Axios interceptor for request intercept.
axiosInstance.interceptors.request.use(
  (config) => {
    // Guard access to localStorage to avoid SSR errors
    const token =
      typeof window !== "undefined" ? localStorage.getItem("loginToken") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Error in axios interceptor:", error);
    const originalRequest = error.config;

    // Make sure response and status exist before checking status
    const status = error?.response?.status;

    if (status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        refreshToken()
          .then((token) => {
            if (token) {
              axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

async function refreshToken() {
  // Guard access to localStorage — do not try to refresh on server
  if (typeof window === "undefined") {
    throw new Error("Cannot refresh token on server");
  }

  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refreshToken available");

  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_SITE_URL + "/api/auth/refresh/",
      {
        refresh: refreshToken,
      }
    );
    const newToken = res.data.access;
    if (newToken) {
      localStorage.setItem("loginToken", newToken);
      return newToken;
    }
    throw new Error("No access token in refresh response");
  } catch (err) {
    console.log(err?.message || err);
    throw err;
  }
}
export default axiosInstance;
