"use client";
import "./SettingsBlock.css";
import { useSettings } from "@/app/context/SettingsContext/ui/SettingsContext";

const SettingsBlock = () => {
  const {
    language,
    setLanguage,
    temperature,
    setTemperature,
    windSpeed,
    setWindSpeed,
    t,
  } = useSettings();

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <h2 className="settings-title">{t("settings")}</h2>

        <div className="settings-grid">
          <div className="settings-item">
            <label htmlFor="language-select">{t("language")}</label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="settings-select"
            >
              <option value="en">{t("english")}</option>
              <option value="ru">{t("russian")}</option>
            </select>
          </div>

          <div className="settings-item">
            <label htmlFor="temperature-select">{t("temperature")}</label>
            <select
              id="temperature-select"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="settings-select"
            >
              <option value="celsius">{t("celsius")}</option>
              <option value="fahrenheit">{t("fahrenheit")}</option>
            </select>
          </div>

          <div className="settings-item">
            <label htmlFor="wind-select">{t("windSpeed")}</label>
            <select
              id="wind-select"
              value={windSpeed}
              onChange={(e) => setWindSpeed(e.target.value)}
              className="settings-select"
            >
              <option value="mph">{t("mph")}</option>
              <option value="kmh">{t("kmh")}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsBlock;
