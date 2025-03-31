"use client";
import {
  formatTime,
  getDayFormatted,
  getDayOfWeek,
  now,
} from "../model/getDays";
import "./ObservationsBlock.css";
import { useSettings } from "@/app/context/SettingsContext/ui/SettingsContext";

export const ObservationsBlock = () => {
  const { t } = useSettings();

  return (
    <div className="observations-wrapper">
      <div className="observations-container">
        <div className="observations-info">
          <p className="observations-title">{t("observations")}</p>
          <p className="observations-time">
            {t("observedAt")} {formatTime(now)}, <br />
            {getDayOfWeek(now)} {getDayFormatted(now)}
          </p>
          <div className="div-outline"></div>
        </div>

        <div className="observations-data"></div>
      </div>
    </div>
  );
};
