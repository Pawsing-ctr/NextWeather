"use client";

import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { translations } from "../types/SettingsTypes";

interface SettingsContextType {
  language: string;
  setLanguage: (lang: string) => void;
  temperature: string;
  setTemperature: (temp: string) => void;
  windSpeed: string;
  setWindSpeed: (speed: string) => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [temperature, setTemperature] = useState(
    localStorage.getItem("temperature") || "celsius"
  );
  const [windSpeed, setWindSpeed] = useState(
    localStorage.getItem("windSpeed") || "kmh"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
    localStorage.setItem("temperature", temperature);
    localStorage.setItem("windSpeed", windSpeed);
  }, [language, temperature, windSpeed]);

  const t = (key: string) => translations[language as "en" | "ru"][key] || key;

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        temperature,
        setTemperature,
        windSpeed,
        setWindSpeed,
        t,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
