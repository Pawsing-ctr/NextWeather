import $api from "../$api";
import { tokenPath } from "./tokenPath";

// Обноавление токена в процессе (флаг)
let isRefreshing = false;

// Очередь запросов, ожидающих обновления токена
let refreshSubscribers: (() => void)[] = [];

// Функция для добавления запроса в очередь
const subscribeTokenRefresh = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

// Функция для вып. всех запрсов из очереди
const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

export const refreshToken = async () => {
  if (isRefreshing) {
    return new Promise<void>((resolve) => {
      subscribeTokenRefresh(() => resolve());
    });
  }

  isRefreshing = true;

  try {
    await $api.post(tokenPath.REFRESH_TOKEN_USER);

    isRefreshing = false;
    onTokenRefreshed();
  } catch (error) {
    isRefreshing = false;
    throw error;
  }
};

// export const resetRedirectFlag = () => {
//   if (typeof window !== "undefined") {
//     sessionStorage.removeItem("redirected");
//   }
// };

export const logout = async () => {
  try {
    await $api.post(tokenPath.USER_LOGOUT, {}, { withCredentials: true });
  } catch (error) {
    console.error("Login Error:", error);
  } finally {
    // if (typeof window !== "undefined") {
    //   window.location.href = "/auth";
    // }
  }
};
