import axios from "axios";
import { logout, refreshToken } from "./apiTokens";
import { tokenPath } from "./apiTokens/tokenPath";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(tokenPath.REFRESH_TOKEN_USER)
    ) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return $api(originalRequest);
      } catch (refreshError) {
        await logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
