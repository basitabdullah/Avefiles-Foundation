import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://meteor-ecom-mern.onrender.com/api",
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
