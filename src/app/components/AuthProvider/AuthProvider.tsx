"use client";
import $api from "@/app/api/$api";
import { refreshToken } from "@/app/api/apiTokens";
import { tokenPath } from "@/app/api/apiTokens/tokenPath";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { loginRequest, logoutRequest, registrationRequest } from "./request";
import { IAuthContextType, IUser } from "./type";

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

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    const response = await loginRequest(tokenPath.USER_LOGIN, credentials);

    if (response.data && response.data.user) {
      setUser(response.data.user);
      setIsAuthenticated(true);
      setIsAdmin(response.data.user.role === "admin");

      if (response.data.accessToken) {
        $api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
      }
    }
    setLoading(false);
    return response;
  };

  const register = async (
    email: string,
    password: string,
    birthDate?: { day: string; month: string; year: string }
  ) => {
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

    const response = await registrationRequest(
      tokenPath.USER_REGISTER,
      userData,
      setError
    );

    if (response.status === 201 || response.data.user) {
      if (birthDate?.year) {
        document.cookie = `userBirthYear=${birthDate.year}; path=/; max-age=${
          60 * 60 * 24 * 30
        }`;
      }
      refreshTokenFunc();

      router.push("/");
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);

    await logoutRequest(tokenPath.USER_LOGOUT, setError);

    errorRefreshToken();
    setLoading(false);
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
