"use client";
import { type FC, useEffect, useState } from "react";
import {
  formatTime,
  getDayFormatted,
  getDayOfWeek,
  now,
} from "../model/getDays";
import "./ObservationsBlock.css";
import type { WeatherProps } from "@/app/page";
import axios from "axios";
import { useSettings } from "@/app/context/ui/SettingsContext";
import Image from "next/image";

export const ObservationsBlock: FC<WeatherProps> = ({ selectedCity }) => {
  const [weather, setWeather] = useState<{
    temperature: string;
    humidity: string;
    visibility: string;
    pressure: string;
    windSpeed: string;
    icon: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const { t, temperature: tempUnit, windSpeed: windUnit } = useSettings();

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
        );

        const tempC = res.data.main.temp;
        const temperature =
          tempUnit === "fahrenheit"
            ? Math.round((tempC * 9) / 5 + 32).toString()
            : Math.round(tempC).toString();

        const windKmh = res.data.wind.speed * 3.6;
        const windSpeed =
          windUnit === "mph"
            ? Math.round(windKmh * 0.621371) + " " + t("mph")
            : Math.round(windKmh) + " " + t("kmh");

        setWeather({
          temperature,
          humidity: res.data.main.humidity + "%",
          visibility: (res.data.visibility / 1000).toFixed(0) + " km",
          pressure: res.data.main.pressure + " mb",
          windSpeed,
          icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log("404! Weather data not found.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity, tempUnit, windUnit, t, API_KEY]);

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
            <p className="loading-text">{t("loading")}</p>
          ) : weather ? (
            <>
              <div className="weather-main-info">
                <Image
                  src={weather.icon || "/placeholder.svg"}
                  className="weather-icon"
                  alt={t("weather")}
                  width={100}
                  height={100}
                />
                <p className="temperature">{weather.temperature}°</p>
                <p>
                  <strong>{t("humidity")}:</strong> {weather.humidity}
                </p>
                <p>
                  <strong>{t("visibility")}:</strong> {weather.visibility}
                </p>
                <p>
                  <strong>{t("pressure")}:</strong> {weather.pressure}
                </p>
                {weather.windSpeed && (
                  <p>
                    <strong>{t("wind")}:</strong> {weather.windSpeed}
                  </p>
                )}
              </div>
              <div className="station-separator"></div>
              <div className="observation-station">
                {t("observationStation")} {selectedCity}
              </div>
            </>
          ) : (
            <p className="error-text">{t("error404")}</p>
          )}
        </div>
      </div>
    </div>
  );
};
