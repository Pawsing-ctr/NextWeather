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
import TodayWeather from "../TodayCast/TodayCast";
import ForecastDay from "../ForeCast/ForeCast";
import "./WeatherBlock.css";

const WeatherBlock: FC<WeatherProps> = ({ setSelectedCity, selectedCity }) => {
  const [searchGeo, setSearchGeo] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("searchGeo") || "";
    }
    return "";
  });

  const [isModalOpen, setIsModalOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("isGeoAllowed") ? false : true;
    }
    return true;
  });

  const [isGeoAllowed, setIsGeoAllowed] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("isGeoAllowed") === "true";
    }
    return false;
  });

  const [loading, setLoading] = useState(false);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("weatherData");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [forecastData, setForecastData] = useState<ForecastData | null>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("forecastData");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const API_KEY = "261dbd7e97627a1dd1c935605123e095";

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
      );
      setWeatherData(weatherResponse.data);
      sessionStorage.setItem(
        "weatherData",
        JSON.stringify(weatherResponse.data)
      );
      const forecastResponse = await axios.get<ForecastData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`
      );
      setForecastData(forecastResponse.data);
      sessionStorage.setItem(
        "forecastData",
        JSON.stringify(forecastResponse.data)
      );
    } catch (error) {
      console.log("Error API weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchGeo) {
      sessionStorage.setItem("searchGeo", searchGeo);
    }
  }, [searchGeo]);

  useEffect(() => {
    sessionStorage.setItem("isGeoAllowed", isGeoAllowed.toString());
  }, [isGeoAllowed]);

  useEffect(() => {
    if (selectedCity) {
      sessionStorage.setItem("selectedCity", selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (!isGeoAllowed) return;
    const savedCity = sessionStorage.getItem("searchGeo");
    if (savedCity) {
      setSearchGeo(savedCity);
      return;
    }

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
    const savedCity = sessionStorage.getItem("selectedCity");

    if (selectedCity) {
      fetchWeatherData(selectedCity);
    } else if (savedCity) {
      if (setSelectedCity) {
        setSelectedCity(savedCity);
      }
      fetchWeatherData(savedCity);
    } else if (searchGeo) {
      fetchWeatherData(searchGeo);
    }
  }, [selectedCity, searchGeo]);

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
      .slice(0, 6);
  };

  const displayCity =
    weatherData?.name || selectedCity || searchGeo || "Your city...";
  const dailyForecast = getDailyForecast();

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
      <main
        className={`main-block ${
          weatherData ? getWeatherBackground(weatherData) : "weather-default"
        }`}
      >
        <div className="weather-container">
          <div className="city-name">{displayCity}</div>

          {loading && <div className="weather-loading">Loading...</div>}

          {weatherData && (
            <div className="weather-content">
              <div className="forecast-wrapper">
                <TodayWeather weatherData={weatherData} />

                {forecastData && (
                  <div className="forecast-days">
                    {dailyForecast.map((day, index) => (
                      <div key={index}>
                        <ForecastDay day={day} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default WeatherBlock;
