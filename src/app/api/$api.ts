import axios from "axios";
const baseURL = "http://localhost:3010/api/";

const $api = axios.create({
  withCredentials: false,
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

$api.interceptors.request.use((config) => {
  return config;
});

export default $api;
