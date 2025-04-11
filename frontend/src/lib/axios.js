import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://avefilesfoundation.in/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;




