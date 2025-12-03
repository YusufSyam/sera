import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHAT_AI_API_URL,
  //   timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor untuk request
axiosClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Interceptor untuk response
axiosClient.interceptors.response.use(
  (response) => response.data, // agar service langsung terima data
  (error) => {
    // contoh: refresh token / redirect jika 401
    if (error.response?.status === 401) {
      // handle unauthorized
      console.warn("Unauthorized — please login again.");
    }
    return Promise.reject(error);
  }
);

export { axiosClient };
