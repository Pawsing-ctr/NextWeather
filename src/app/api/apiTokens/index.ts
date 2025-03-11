import $api from "../$api";
import { tokenPath } from "./tokenPath";

export let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
};

// Обноавление токена в процессе (флаг)
let isRefreshing = false;

// Очередь запросов, ожидающих обновления токена
let refreshSubscribers: ((token: string) => void)[] = [];

// Функция для добавления запроса в очередь
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Функция для вып. всех запрсов из очереди
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

export const refreshToken = async () => {
  if (isRefreshing) {
    return new Promise<string>((resolve) => {
      subscribeTokenRefresh((token) => resolve(token));
    });
  }

  isRefreshing = true;

  try {
    const response = await $api.post(
      tokenPath.REFRESH_TOKEN_USER,
      {},
      { withCredentials: true }
    );

    const newToken = response.data.accessToken;
    setAccessToken(newToken);

    $api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

    isRefreshing = false;
    onTokenRefreshed(newToken);

    return newToken;
  } catch (error) {
    isRefreshing = false;

    clearAccessToken();

    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
};
