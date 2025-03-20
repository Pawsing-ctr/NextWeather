import type React from "react";
import type { ForecastItem } from "../../types/index";
import { formatDay, formatDate } from "../../utils/weather-utils";
import "./ForeCast.css";

interface ForecastDayProps {
  day: ForecastItem;
}

const ForecastDay: React.FC<ForecastDayProps> = ({ day }) => (
  <div className={`forecast-day`}>
    <div className="forecast-day-header">
      <div className="day-name">{formatDay(day.dt)}</div>
      <div className="day-date">{formatDate(day.dt)}</div>
    </div>
    <div className="forecast-day-icon">
      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon.replace(
          "n",
          "d"
        )}.png`}
        alt={day.weather[0].description}
      />
    </div>
    <div className="forecast-day-temp">{Math.round(day.main.temp)}°</div>
    <div className="forecast-day-feels">
      {day.main.feels_like < 0 ? "-" : ""}
      {Math.abs(Math.round(day.main.feels_like))}°
    </div>
  </div>
);

export default ForecastDay;
