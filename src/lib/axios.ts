import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://lg-crm-backend.onrender.com/api",
  withCredentials: true,
});
