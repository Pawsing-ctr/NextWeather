"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import $api from "@/app/api/$api";
import { refreshToken } from "@/app/api/apiTokens";
import { tokenPath } from "@/app/api/apiTokens/tokenPath";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

interface IUser {
  id: number;
  email: string;
  role: string;
}

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IAuthContextType {
  login: (credentials: ILoginCredentials) => Promise<AxiosResponse>;
  register: (
    email: string,
    password: string,
    birthDate?: { day: string; month: string; year: string }
  ) => Promise<void>;
  logout: () => Promise<void>;
  user: IUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  const refreshTokenFunc = async () => {
    try {
      const response = await $api.get(tokenPath.ME_TOKEN);
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setIsAdmin(response.data.user.role === "admin");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Ошибка получения данных пользователя:", error);
      return false;
    }
  };

  const errorRefreshToken = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);

        const success = await refreshTokenFunc();

        if (!success) {
          try {
            await refreshToken();
            await refreshTokenFunc();
          } catch (refreshError) {
            errorRefreshToken();
            console.error("Error update token:", refreshError);
          }
        }
      } catch (error) {
        console.error("Ошибка аутентификации:", error);
        errorRefreshToken();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Пример разбора запросов на функциии СДЕЛАТЬ!!!
  // const loginRequest = async (
  //   path: string,
  //   credentials: {
  //     email: string;
  //     password: string;
  //   }
  // ) => {
  //   try {
  //     return await $api.post(path, credentials);
  //   } catch (error: any) {
  //     console.error(error);
  //     return error;
  //   }
  // };

  // const login = async (credentials: { email: string; password: string }) => {
  //   setLoading(true);
  //   setError(null);

  //   const response = await loginRequest(tokenPath.USER_LOGIN, credentials);

  //   if (response.status === 200) {
  //     setUser(response.data.user);
  //     setIsAuthenticated(true);
  //     setIsAdmin(response.data.role === "admin");
  //   } else {
  //     setError(response.data?.message || "An error occurred during login");
  //   }
  //   setLoading(false);
  //   return response;
  // };

  const login = async (credentials: ILoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await $api.post(tokenPath.USER_LOGIN, credentials);

      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setIsAdmin(response.data.user.role === "admin");
        if (response.data.accessToken) {
          $api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
        }
        return response;
      } else {
        throw new Error(response.data?.message || "Login failed");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    birthDate?: { day: string; month: string; year: string }
  ) => {
    try {
      setLoading(true);
      setError(null);

      const userData = {
        email,
        password,
        ...(birthDate && {
          day: birthDate.day,
          month: birthDate.month,
          year: birthDate.year,
        }),
      };

      const response = await $api.post(tokenPath.USER_REGISTER, userData);

      if (response.status === 201 || response.data.user) {
        refreshTokenFunc();

        router.push("/");
      }
    } catch (error: any) {
      console.error(
        "Ошибка регистрации:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "An error occurred during registration"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      await $api.post(tokenPath.USER_LOGOUT);

      errorRefreshToken();

      router.push("/");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred during logout"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
