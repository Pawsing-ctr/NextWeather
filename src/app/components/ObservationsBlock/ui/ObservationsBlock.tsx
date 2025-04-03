"use client";
import { type FC, useEffect, useState } from "react";
import {
  formatTime,
  getDayFormatted,
  getDayOfWeek,
  now,
} from "../model/getDays";
import "./ObservationsBlock.css";
import { useSettings } from "@/app/context/SettingsContext/ui/SettingsContext";
import type { WeatherProps } from "@/app/page";
import axios from "axios";

export const ObservationsBlock: FC<WeatherProps> = ({ selectedCity }) => {
  const [weather, setWeather] = useState<{
    temperature: string;
    humidity: string;
    visibility: string;
    pressure: string;
    icon: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useSettings();

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
        );

        setWeather({
          temperature: Math.round(res.data.main.temp).toString(),
          humidity: res.data.main.humidity + "%",
          visibility: (res.data.visibility / 1000).toFixed(0) + " km",
          pressure: res.data.main.pressure + " mb",
          icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        });
      } catch (error) {
        console.log("404! Weather data not found.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <div className="observations-wrapper">
      <div className="observations-container">
        <div className="observations-info">
          <p className="observations-title">{t("observations")}</p>
          <p className="observations-time">
            {t("observedAt")} {formatTime(now)}, <br />
            {getDayOfWeek(now)} {getDayFormatted(now)}
          </p>
        </div>

        <div className="observations-data">
          {isLoading ? (
            <p>Loading...</p>
          ) : weather ? (
            <>
              <img src={weather.icon} className="weather-icon" />
              <p>{weather.temperature}°</p>
              <p>
                <strong>Humidity:</strong> {weather.humidity}
              </p>
              <p>
                <strong>Visibility:</strong> {weather.visibility}
              </p>
              <p>
                <strong>Pressure:</strong> {weather.pressure}
              </p>
            </>
          ) : (
            <p>404!</p>
          )}
          <div className="observation-station">
            Observation Station: {selectedCity}
          </div>
        </div>
      </div>
    </div>
  );
};
