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

const dayNamesRu = {
  Mon: "Пн",
  Tue: "Вт",
  Wed: "Ср",
  Thu: "Чт",
  Fri: "Пт",
  Sat: "Сб",
  Sun: "Вс",
};

export const formatDay = (timestamp: number, language = "en"): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
  };

  const dayName = new Intl.DateTimeFormat("en-EN", options).format(date);

  if (language === "ru") {
    return dayNamesRu[dayName as keyof typeof dayNamesRu] || dayName;
  }

  return dayName;
};

export const formatDate = (timestamp: number, language = "en"): string => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();

  if (language === "ru") {
    return `${day}`;
  }

  let suffix = "th";
  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

  return `${day}${suffix}`;
};

const weatherDescriptionsRu: Record<string, string> = {
  "clear sky": "Ясное небо",
  "few clouds": "Небольшая облачность",
  "scattered clouds": "Рассеянные облака",
  "broken clouds": "Облачно с прояснениями",
  "overcast clouds": "Пасмурно",
  "light rain": "Небольшой дождь",
  "moderate rain": "Умеренный дождь",
  "heavy rain": "Сильный дождь",
  thunderstorm: "Гроза",
  snow: "Снег",
  mist: "Туман",
  fog: "Густой туман",
  drizzle: "Морось",
  "and a gentle breeze": "и легкий ветерок",
};

export const getWeatherDescription = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  weather: any,
  language = "en"
): string => {
  const description = weather.description.toLowerCase();

  if (language === "ru") {
    const translatedDesc = weatherDescriptionsRu[description] || description;
    return `${translatedDesc} ${weatherDescriptionsRu["and a gentle breeze"]}`;
  }

  const capitalizedDesc =
    description.charAt(0).toUpperCase() + description.slice(1);
  return `${capitalizedDesc} and a gentle breeze`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getWeatherBackground = (weatherData: any): string => {
  if (!weatherData) return "weather-default";

  const weatherId = String(weatherData.weather[0].id);
  const icon = weatherData.weather[0].icon;
  const isDay = icon.includes("d");

  const category = weatherBackgrounds[weatherId[0]] || "default";
  return `weather-${category}-${isDay ? "day" : "night"}`;
};
