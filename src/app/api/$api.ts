import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { accessToken, refreshToken } from "./apiTokens";
const baseURL = "http://localhost:3011/api/";

const $api = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interface IErrorResponseData {
  message: string;
  expired?: boolean;
}

$api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

$api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<IErrorResponseData>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      error.response?.data?.expired &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return $api({ ...originalRequest });
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default $api;
