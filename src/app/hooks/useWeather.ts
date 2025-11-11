import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  ForecastData,
  ForecastItem,
  WeatherData,
} from "../components/Weather/types";
import { useSettings } from "@/app/context/ui/SettingsContext";

export const useWeather = (
  selectedCity: string | null,
  setSelectedCity?: (city: string) => void
) => {
  const { language } = useSettings();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const [searchGeo, setSearchGeo] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("searchGeo") || "";
    }
    return "";
  });

  const [isGeoAllowed, setIsGeoAllowed] = useState<boolean | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("isGeoAllowed") === "true";
    }
    return false;
  });

  const [loading, setLoading] = useState(false);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(sessionStorage.getItem("weatherData") || "null");
    }
    return null;
  });

  const [forecastData, setForecastData] = useState<ForecastData | null>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(sessionStorage.getItem("forecastData") || "null");
    }
    return null;
  });

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [todayHourlyData, setTodayHourlyData] = useState<ForecastItem[]>([]);

  const fetchWeatherData = useCallback(
    async (city: string) => {
      setLoading(true);
      try {
        const lang = language === "ru" ? "ru" : "en";
        const [weather, forecast] = await Promise.all([
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`
          ),
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`
          ),
        ]);

        setWeatherData(weather.data);
        setForecastData(forecast.data);
        sessionStorage.setItem("weatherData", JSON.stringify(weather.data));
        sessionStorage.setItem("forecastData", JSON.stringify(forecast.data));
      } catch {
        console.error("Error fetching weather data");
      } finally {
        setLoading(false);
      }
    },
    [language, API_KEY]
  );

  useEffect(() => {
    const city = selectedCity || searchGeo;
    if (city) fetchWeatherData(city);
  }, [language, fetchWeatherData, searchGeo, selectedCity]);

  const fetchLocation = useCallback(async () => {
    try {
      const { data } = await axios.get("https://ip-api.com/json/");
      setSearchGeo(data.city);
      fetchWeatherData(data.city);
    } catch {
      console.error("Error fetching location");
    }
  }, [fetchWeatherData]);

  useEffect(() => {
    if (searchGeo) sessionStorage.setItem("searchGeo", searchGeo);
  }, [searchGeo]);

  useEffect(() => {
    if (selectedCity) {
      sessionStorage.setItem("selectedCity", selectedCity);
      fetchWeatherData(selectedCity);
    } else {
      const savedCity = sessionStorage.getItem("selectedCity") || searchGeo;
      if (savedCity) {
        setSelectedCity?.(savedCity);
        fetchWeatherData(savedCity);
      }
    }
  }, [selectedCity, fetchWeatherData, searchGeo, setSelectedCity]);

  useEffect(() => {
    if (forecastData) {
      const today = new Date().toISOString().split("T")[0];
      setTodayHourlyData(
        forecastData.list.filter(
          (item) =>
            new Date(item.dt * 1000).toISOString().split("T")[0] === today
        )
      );
    }
  }, [forecastData]);

  useEffect(() => {
    if (isGeoAllowed) {
      sessionStorage.setItem("isGeoAllowed", "true");
      fetchLocation();
    }
  }, [isGeoAllowed, fetchLocation]);

  return {
    searchGeo,
    setSearchGeo,
    isGeoAllowed,
    setIsGeoAllowed,
    loading,
    weatherData,
    forecastData,
    selectedDay,
    setSelectedDay,
    todayHourlyData,
  };
};
