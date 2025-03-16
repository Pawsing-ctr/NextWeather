import type React from "react";
import type { WeatherData } from "../../types/index";
import { getWeatherDescription } from "../../utils/weather-utils";
import "./TodayCast.css";

interface TodayWeatherProps {
  weatherData: WeatherData;
}

const TodayWeather: React.FC<TodayWeatherProps> = ({ weatherData }) => {
  return (
    <div className="today-container">
      <div className="today-header">Today</div>
      <div className="today-content">
        <div className="today-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon.replace(
              "n",
              "d"
            )}@2x.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
        <div className="today-temps">
          <div className="today-temp">{Math.round(weatherData.main.temp)}°</div>
          <div className="feels-like">
            {Math.round(weatherData.main.feels_like)}°
          </div>
        </div>
        <div className="today-description">
          {getWeatherDescription(weatherData.weather[0])}
        </div>
      </div>
    </div>
  );
};

export default TodayWeather;
