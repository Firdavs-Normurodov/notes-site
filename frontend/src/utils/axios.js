import axios from "axios";
import { BASE_URL } from "../utils/constans"; // 'constans'ni 'constants'ga o'zgartirish

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 sekund timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor orqali request konfiguratsiyasini sozlash
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token"); // tokenni olish
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Tokenni headerga qo'shish
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Xatolik bo'lsa, uni qaytarish
  }
);

export default axiosInstance;
