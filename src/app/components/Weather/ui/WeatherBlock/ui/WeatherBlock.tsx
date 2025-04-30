import { FC } from "react";

import "./WeatherBlock.css";
import { useSettings } from "@/app/context/ui/SettingsContext";
import { useWeather } from "@/app/hooks/useWeather";
import { getWeatherBackground } from "../../../utils/weather-utils";
import ModalGeo from "@/app/components/ModalGeo/ModalGeo";
import WeatherCard from "../../WeatherCard/WeatherCard";
import HourlyCast from "../../HourlyCast/HourlyCast";
import { WeatherProps } from "@/app/page";
import { ForecastData, ForecastItem } from "../../../types";

const WeatherBlock: FC<WeatherProps> = ({ setSelectedCity, selectedCity }) => {
  const { t } = useSettings();
  const {
    searchGeo,
    isGeoAllowed,
    setIsGeoAllowed,
    loading,
    weatherData,
    forecastData,
    selectedDay,
    setSelectedDay,
    todayHourlyData,
  } = useWeather(selectedCity, setSelectedCity);

  const dailyForecast = getDailyForecast(forecastData ?? { list: [] });
  const getHourlyForecast = () =>
    selectedDay
      ? forecastData?.list.filter((item) =>
          new Date(item.dt * 1000).toISOString().startsWith(selectedDay)
        )
      : todayHourlyData;

  const displayCity =
    weatherData?.name || selectedCity || searchGeo || t("yourCity");
  const backgroundWeather = selectedDay
    ? forecastData?.list.find(
        (item) =>
          new Date(item.dt * 1000).toISOString().split("T")[0] === selectedDay
      )
    : weatherData;
  const backgroundClass = backgroundWeather
    ? getWeatherBackground(backgroundWeather)
    : "weather-default";

  return (
    <>
      {isGeoAllowed === false && (
        <ModalGeo
          onClose={() => setIsGeoAllowed(false)}
          onAccept={() => {
            setIsGeoAllowed(true);
          }}
        />
      )}
      <main className={`main-block ${backgroundClass}`}>
        <div className="weather-container">
          <div className="city-name">{displayCity}</div>
          {loading ? (
            <div className="weather-loading">{t("loading")}</div>
          ) : (
            <div className="forecast-wrapper">
              {weatherData && (
                <WeatherCard
                  day={weatherData}
                  activeDay={selectedDay}
                  setActiveDay={setSelectedDay}
                  isToday
                />
              )}
              <div className="forecast-days">
                {dailyForecast.map((day: ForecastItem, index: number) => (
                  <WeatherCard
                    key={index}
                    day={day}
                    activeDay={selectedDay}
                    setActiveDay={setSelectedDay}
                    isToday={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <HourlyCast data={getHourlyForecast() ?? []} selectedDay={selectedDay} />
    </>
  );
};

export default WeatherBlock;

function getDailyForecast(forecastData: ForecastData) {
  if (!forecastData?.list) return [];

  const today = new Date().toISOString().split("T")[0];
  const uniqueDates = new Set();

  return forecastData.list
    .filter((item) => {
      const dateStr = new Date(item.dt * 1000).toISOString().split("T")[0];
      if (dateStr === today || uniqueDates.has(dateStr)) return false;
      uniqueDates.add(dateStr);
      return true;
    })
    .slice(0, 5);
}
