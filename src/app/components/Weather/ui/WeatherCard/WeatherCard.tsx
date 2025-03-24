import React from "react";
import type { ForecastItem, WeatherData } from "../../types/index";
import {
  formatDay,
  formatDate,
  getWeatherDescription,
} from "../../utils/weather-utils";
import "./WeatherCard.css";

interface WeatherCardProps {
  day: WeatherData | ForecastItem;
  activeDay: string | null;
  setActiveDay: (day: string) => void;
  isToday: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  day,
  activeDay,
  setActiveDay,
  isToday,
}) => {
  const isWeatherData = "name" in day;

  const timestamp = isWeatherData ? Math.floor(Date.now() / 1000) : day.dt;

  const dateStr = new Date(timestamp * 1000).toISOString().split("T")[0];

  const isActive = isToday ? activeDay === null : dateStr === activeDay;

  const temp = Math.round(day.main.temp);
  const feelsLike = Math.round(day.main.feels_like);
  const weather = day.weather[0];
  const icon = weather.icon.replace("n", "d");

  const handleClick = () => {
    if (isToday && activeDay === null) return;

    setActiveDay(isToday ? null : dateStr);
  };

  return (
    <div
      className={`weather-card ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="weather-card-header">
        <div className="day-name">
          {isToday ? "Today" : formatDay(timestamp)}
        </div>
        <div className="day-date">{formatDate(timestamp)}</div>
      </div>

      <div className="weather-card-content">
        <div className="weather-card-icon">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={weather.description}
          />
        </div>

        <div className="weather-card-temps">
          <div className="weather-card-temp">{temp}°</div>
          <div className="feels-like">{feelsLike}°</div>
        </div>

        {isActive && (
          <div className="weather-card-description">
            {getWeatherDescription(weather)}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
