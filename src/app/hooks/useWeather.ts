import { useState } from "react";
import {
  loadFromSession,
  loadJSONFromSession,
} from "../components/Weather/ui/WeatherBlock/utils/storage";

export const useWeather = (setSelectedCity, selectedCity) => {
  const [weatherData, setWeatherData] = useState(() =>
    loadJSONFromSession("weatherData")
  );
  const [forecastData, setForecastData] = useState(() =>
    loadJSONFromSession("forecast")
  );
  const [searchGeo, setSearchGeo] = useState(
    () => loadFromSession("searchGeo") || ""
  );
};
