import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "./constants";

const token = localStorage.getItem("token");
const request = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

request.interceptors.request.use(
  function (config) {
    // Xử lý trước khi request
    if(!token) return;
    return config;
  },
  function (error) {
    // Xử lý lỗi
    // toast.error('Máy chủ không phản hồi')
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    // xử lý data trả về
    return response.data;
  },
  function (error) {
    //    Error
    // toast.error('Máy chủ không phản hồi')
    return Promise.reject(error);
  }
);

export default request;