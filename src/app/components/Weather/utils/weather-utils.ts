import type { WeatherBackgrounds } from "../types/index";

export const weatherBackgrounds: WeatherBackgrounds = {
  "2": "thunderstorm",
  "3": "drizzle",
  "5": "rain",
  "6": "snow",
  "7": "mist",
  "800": "clear",
  "8": "clouds",
};

export const formatDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
  };
  return new Intl.DateTimeFormat("en-EN", options).format(date);
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

  return `${day}${suffix}`;
};

export const getWeatherDescription = (weather: any): string => {
  const description =
    weather.description.charAt(0).toUpperCase() + weather.description.slice(1);
  return `${description} and a gentle breeze`;
};

export const getWeatherBackground = (weatherData: any): string => {
  if (!weatherData) return "weather-default";

  const weatherId = String(weatherData.weather[0].id);
  const icon = weatherData.weather[0].icon;
  const isDay = icon.includes("d");

  const category = weatherBackgrounds[weatherId[0]] || "default";
  return `weather-${category}-${isDay ? "day" : "night"}`;
};
