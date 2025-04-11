import type React from "react";
import type { ForecastItem } from "../../types/index";
import "./HourlyCast.css";
import { useSettings } from "@/app/context/SettingsContext/ui/SettingsContext";

interface HourlyCastProps {
  data: ForecastItem[];
  selectedDay: string | null;
}

const HourlyCast: React.FC<HourlyCastProps> = ({ data, selectedDay }) => {
  const { t, temperature, windSpeed, language } = useSettings();

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.getHours().toString().padStart(2, "0") + ":00";
  };

  if (data.length === 0) {
    return null;
  }

  const formatTemperature = (tempCelsius: number) => {
    if (temperature === "fahrenheit") {
      return Math.round((tempCelsius * 9) / 5 + 32);
    }
    return Math.round(tempCelsius);
  };

  const formatWind = (speedInMs: number): string => {
    if (windSpeed === "mph") {
      return `${Math.round(speedInMs * 2.237)} ${t("mph")}`;
    }
    return `${Math.round(speedInMs * 3.6)} ${t("kmh")}`;
  };

  return (
    <div className="hourly-forecast-container">
      <div className="hourly-forecast-scroll">
        {data.map((hour) => {
          const time = formatTime(hour.dt);
          const temp = formatTemperature(hour.main.temp);
          const icon = hour.weather[0].icon;
          const precipitation = Math.round(Math.random() * 30);
          const speedMs = hour.wind.speed;

          return (
            <div className="hourly-forecast-item" key={hour.dt}>
              <div className="hourly-time">{time}</div>
              <div className="hourly-icon">
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
              </div>
              <div className="hourly-temp">{temp}°</div>
              <div className="hourly-precipitation">
                <div className="precipitation-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={precipitation > 0 ? "#0078D4" : "#999"}
                    strokeWidth="2"
                    aria-label={t("precipitation")}
                  >
                    <path d="M7 13C7 13 12 5 12 5C12 5 17 13 17 13C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13Z" />
                  </svg>
                </div>
                <div
                  className="precipitation-value"
                  style={{ color: precipitation > 0 ? "#0078D4" : "#999" }}
                >
                  {precipitation}%
                </div>
              </div>
              <div className="hourly-wind">
                <div className="wind-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-label={t("wind")}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8L12 16" />
                    <path d="M8 12L16 12" />
                  </svg>
                </div>
                <div className="wind-value">{formatWind(speedMs)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyCast;
