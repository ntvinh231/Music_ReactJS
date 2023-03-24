import axios from "axios";
import { API_URL } from "./constants";

const requestGuest = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

requestGuest.interceptors.request.use(
  function (config) {
    // Xử lý trước khi request
    return config;
  },
  function (error) {
    // Xử lý lỗi
    return Promise.reject(error);
  }
);

requestGuest.interceptors.response.use(
  function (response) {
    // xử lý data trả về
    return response.data;
  },
  function (error) {
    //    Error
    return Promise.reject(error);
  }
);

export default requestGuest;