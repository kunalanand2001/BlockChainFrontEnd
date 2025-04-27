import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://172.23.194.248:9000', // replace with your backend URL
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;
