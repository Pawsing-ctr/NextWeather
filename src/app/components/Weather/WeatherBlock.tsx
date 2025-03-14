"use client";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { ICitiies } from "../Nav/Nav";
import "./WeatherBlock.css";
import ModalGeo from "../ModalGeo/ModalGeo";
import { WeatherProps } from "@/app/page";

interface weatherData {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  name: string;
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
}

interface ForecastData {
  list: ForecastItem[];
}

const WeatherBlock: FC<WeatherProps> = ({ setSelectedCity, selectedCity }) => {
  const [searchGeo, setSearchGeo] = useState("");
  const [cities, setCities] = useState<ICitiies[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isGeoAllowed, setIsGeoAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const API_KEY = "261dbd7e97627a1dd1c935605123e095";

  // function for Data Weather
  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get<ForecastData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`
      );
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.log("Error API weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isGeoAllowed) return;

    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json/");
        setSearchGeo(response.data.city);
        fetchWeatherData(response.data.city);
      } catch (error) {
        console.log("Error GEO");
      }
    };
    fetchLocation();
  }, [isGeoAllowed]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    } else if (searchGeo) {
      fetchWeatherData(searchGeo);
    }
  }, [selectedCity, searchGeo]);

  // for background
  const weatherBackgrounds: { [key: string]: string } = {
    "2": "thunderstorm",
    "3": "drizzle",
    "5": "rain",
    "6": "snow",
    "7": "mist",
    "800": "clear",
    "8": "clouds",
  };

  const getWeatherBackground = () => {
    if (!weatherData) return "weather-default";

    const weatherId = String(weatherData.weather[0].id);
    const icon = weatherData.weather[0].icon;
    const isDay = icon.includes("d");

    const category = weatherBackgrounds[weatherId[0]] || "default";
    return `weather-${category}-${isDay ? "day" : "night"}`;
  };

  const FormDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-EN", options).format(date);
  };

  const getDailyForecast = () => {
    if (!forecastData) return [];

    return forecastData.list
      .reduce((acc: ForecastItem[], item) => {
        const dateStr = new Date(item.dt * 1000).toISOString().split("T")[0];
        if (
          !acc.some(
            (day) =>
              new Date(day.dt * 1000).toISOString().split("T")[0] === dateStr
          )
        ) {
          acc.push(item);
        }
        return acc;
      }, [])
      .slice(0, 5);
  };

  const displayCity =
    weatherData?.name || selectedCity || searchGeo || "Your city...";
  const dailyForecast = getDailyForecast();

  const getWeatherDescription = (weather: any) => {
    return `${weather.description} and light winds`;
  };

  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Morning";
    if (hours >= 12 && hours < 17) return "Afternoon";
    if (hours >= 17 && hours < 21) return "Evening";
    return "Tonight";
  };

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
      <main className={`main-block ${getWeatherBackground()}`}>
        <div className="weather-container">
          <div className="city-name">{displayCity}</div>

          {loading && <div className="weather-loading">Loading...</div>}

          {weatherData && (
            <div className="weather-content">
              <div className="current-weather-box">
                <div className="time-of-day">{getTimeOfDay()}</div>
                <div className="current-weather-info">
                  <div className="weather-icon-temp">
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt={weatherData.weather[0].description}
                    />
                    <div className="temperature-group">
                      <span className="current-temp">
                        {Math.round(weatherData.main.temp)}°
                      </span>
                      <span className="min-temp">
                        {Math.round(weatherData.main.temp_min)}°
                      </span>
                    </div>
                  </div>
                  <div className="weather-description">
                    {getWeatherDescription(weatherData.weather[0])}
                  </div>
                </div>
              </div>

              {forecastData && (
                <div className="forecast-container">
                  {dailyForecast.map((day, index) => (
                    <div key={index} className="forecast-day">
                      <div className="forecast-header">
                        <span className="forecast-date">
                          {FormDate(day.dt)}
                        </span>
                      </div>
                      <div className="forecast-icon">
                        <img
                          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                          alt={day.weather[0].description}
                        />
                      </div>
                      <div className="forecast-temps">
                        <span className="max-temp">
                          {Math.round(day.main.temp)}°
                        </span>
                        <span className="min-temp">
                          {Math.round(day.main.temp_min)}°
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default WeatherBlock;
