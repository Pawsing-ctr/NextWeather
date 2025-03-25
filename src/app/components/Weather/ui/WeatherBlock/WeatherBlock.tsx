"use client";
import axios from "axios";
import { type FC, useEffect, useState } from "react";
import ModalGeo from "../../../ModalGeo/ModalGeo";
import type { WeatherProps } from "@/app/page";
import type {
  WeatherData,
  ForecastData,
  ForecastItem,
} from "../../types/index";
import { getWeatherBackground } from "../../utils/weather-utils";
import HourlyCast from "../HourlyCast/HourlyCast";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./WeatherBlock.css";

const WeatherBlock: FC<WeatherProps> = ({ setSelectedCity, selectedCity }) => {
  const [searchGeo, setSearchGeo] = useState(
    () => sessionStorage.getItem("searchGeo") || ""
  );
  const [isModalOpen, setIsModalOpen] = useState(
    () => !sessionStorage.getItem("isGeoAllowed")
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

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`
        ),
      ]);

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
      sessionStorage.setItem(
        "weatherData",
        JSON.stringify(weatherResponse.data)
      );
      sessionStorage.setItem(
        "forecastData",
        JSON.stringify(forecastResponse.data)
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocation = async () => {
    try {
      const { data } = await axios.get("http://ip-api.com/json/");
      setSearchGeo(data.city);
      fetchWeatherData(data.city);
    } catch (error) {
      console.error("Error fetching location");
    }
  };

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

  const getDailyForecast = () => {
    if (!forecastData) return [];

    const today = new Date().toISOString().split("T")[0];
    const uniqueDates = new Set<string>();

    return forecastData.list
      .filter((item) => {
        const dateStr = new Date(item.dt * 1000).toISOString().split("T")[0];
        if (dateStr === today) return false;

        if (uniqueDates.has(dateStr)) return false;

        uniqueDates.add(dateStr);
        return true;
      })
      .slice(0, 5);
  };

  const getHourlyForecast = () => {
    if (!forecastData) return [];
    return selectedDay
      ? forecastData.list.filter(
          (item) =>
            new Date(item.dt * 1000).toISOString().split("T")[0] === selectedDay
        )
      : todayHourlyData;
  };

  const displayCity =
    weatherData?.name || selectedCity || searchGeo || "Your city...";
  const dailyForecast = getDailyForecast();
  const backgroundWeather = selectedDay
    ? forecastData?.list.find(
        (item) =>
          new Date(item.dt * 1000).toISOString().split("T")[0] === selectedDay
      )
    : weatherData;
  const backgroundClass = backgroundWeather
    ? getWeatherBackground(backgroundWeather)
    : "weather-default";

  return (
    <>
      {isModalOpen && (
        <ModalGeo
          onClose={() => setIsModalOpen(false)}
          onAccept={() => {
            setIsGeoAllowed(true);
            setIsModalOpen(false);
          }}
        />
      )}
      <main className={`main-block ${backgroundClass}`}>
        <div className="weather-container">
          <div className="city-name">{displayCity}</div>
          {loading ? (
            <div className="weather-loading">Loading...</div>
          ) : (
            <div className="forecast-wrapper">
              {weatherData && (
                <WeatherCard
                  day={weatherData}
                  activeDay={selectedDay}
                  setActiveDay={setSelectedDay}
                  isToday
                />
              )}
              {forecastData && (
                <div className="forecast-days">
                  {dailyForecast.map((day, index) => (
                    <WeatherCard
                      key={index}
                      day={day}
                      activeDay={selectedDay}
                      setActiveDay={setSelectedDay}
                      isToday={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <HourlyCast data={getHourlyForecast()} selectedDay={selectedDay} />
    </>
  );
};

export default WeatherBlock;
