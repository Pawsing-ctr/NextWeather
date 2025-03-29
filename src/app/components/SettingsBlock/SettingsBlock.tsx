"use client";

import { useState } from "react";
import "./SettingsBlock.css";

const SettingsBlock = () => {
  const [language, setLanguage] = useState("en");
  const [temperature, setTemperature] = useState("celsius");
  const [windSpeed, setWindSpeed] = useState("mph");

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <h2 className="settings-title">Settings</h2>

        <div className="settings-grid">
          <div className="settings-item">
            <label htmlFor="language-select">Language</label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="settings-select"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>

          <div className="settings-item">
            <label htmlFor="temperature-select">Temperature</label>
            <select
              id="temperature-select"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="settings-select"
            >
              <option value="celsius">Celsius</option>
              <option value="fahrenheit">Fahrenheit</option>
            </select>
          </div>

          <div className="settings-item">
            <label htmlFor="wind-select">Wind speed</label>
            <select
              id="wind-select"
              value={windSpeed}
              onChange={(e) => setWindSpeed(e.target.value)}
              className="settings-select"
            >
              <option value="mph">Miles per hour</option>
              <option value="kmh">Kilometers per hour</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsBlock;
