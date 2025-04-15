"use client";

import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { translations } from "../types/SettingsTypes";

export type Language = "en" | "ru";
export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type TranslationKeys = keyof (typeof translations)["en"];

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  temperature: TemperatureUnit;
  setTemperature: (temp: TemperatureUnit) => void;
  windSpeed: WindSpeedUnit;
  setWindSpeed: (speed: WindSpeedUnit) => void;
  t: (key: TranslationKeys) => string;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [temperature, setTemperature] = useState<TemperatureUnit>("celsius");
  const [windSpeed, setWindSpeed] = useState<WindSpeedUnit>("kmh");

  useEffect(() => {
    const storedLang = localStorage.getItem("language") as Language;
    const storedTemp = localStorage.getItem("temperature") as TemperatureUnit;
    const storedSpeed = localStorage.getItem("windSpeed") as WindSpeedUnit;

    if (storedLang) setLanguage(storedLang);
    if (storedTemp) setTemperature(storedTemp);
    if (storedSpeed) setWindSpeed(storedSpeed);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    localStorage.setItem("temperature", temperature);
    localStorage.setItem("windSpeed", windSpeed);
  }, [language, temperature, windSpeed]);

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key;
  };

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
