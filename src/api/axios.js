import axios from "axios";

const api = axios.create({
  baseURL: "https://h3at-backend-1.onrender.com/api",
});

export default api;