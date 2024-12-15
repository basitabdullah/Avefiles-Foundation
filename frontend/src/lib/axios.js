import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  // baseURL: "http://157.173.219.86:5000/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
