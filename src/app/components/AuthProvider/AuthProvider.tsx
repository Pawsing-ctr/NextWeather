"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import $api from "@/app/api/$api";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/app/api/apiTokens";
import { tokenPath } from "@/app/api/apiTokens/tokenPath";
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
  user: IUser | null;
  login: (credentials: ILoginCredentials) => Promise<void>;
  register: (
    email: string,
    password: string,
    birthDate?: { day: string; month: string; year: string }
  ) => Promise<void>;
  logout: () => Promise<void>;
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

  const router = useRouter();

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (getAccessToken()) {
          const response = await $api.get(tokenPath.ME_TOKEN);
          setUser(response.data.user);
        } else {
          try {
            const response = await $api.post(tokenPath.REFRESH_TOKEN_USER);
            setAccessToken(response.data.accessToken);
            setUser(response.data.user);
          } catch (error) {
            clearAccessToken();
            setUser(null);
          }
        }
      } catch (error) {
        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await $api.post(tokenPath.USER_LOGIN, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAccessToken(response.data.accessToken);
      setUser(response.data.user);

      if (response.data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
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

      console.log("Отправляемые данные:", userData);
      const response = await $api.post(tokenPath.USER_REGISTER, userData);

      setAccessToken(response.data.accessToken);
      setUser(response.data.user);

      router.push("/");
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

      clearAccessToken();
      setUser(null);

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

  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user?.role === "admin";

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
