import { useState, useEffect } from "react";
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

  const [searchGeo, setSearchGeo] = useState(
    () => sessionStorage.getItem("searchGeo") || ""
  );
  const [isGeoAllowed, setIsGeoAllowed] = useState(
    () => sessionStorage.getItem("isGeoAllowed") === "true"
  );
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(() =>
    JSON.parse(sessionStorage.getItem("weatherData") || "null")
  );
  const [forecastData, setForecastData] = useState<ForecastData | null>(() =>
    JSON.parse(sessionStorage.getItem("forecastData") || "null")
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [todayHourlyData, setTodayHourlyData] = useState<ForecastItem[]>([]);

  const fetchWeatherData = async (city: string) => {
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
    } catch (err) {
      console.error("Error fetching weather data", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocation = async () => {
    try {
      const { data } = await axios.get("http://ip-api.com/json/");
      setSearchGeo(data.city);
      fetchWeatherData(data.city);
    } catch (err) {
      console.error("Error fetching location");
    }
  };

  useEffect(() => {
    if (searchGeo) sessionStorage.setItem("searchGeo", searchGeo);
  }, [searchGeo]);

  useEffect(() => {
    const city = selectedCity || searchGeo;
    if (city) fetchWeatherData(city);
  }, [language]);

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
  }, [selectedCity]);

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
  }, [isGeoAllowed]);

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
