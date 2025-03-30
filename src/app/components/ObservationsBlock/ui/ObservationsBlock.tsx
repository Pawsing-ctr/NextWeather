"use client";
import {
  formatTime,
  getDayFormatted,
  getDayOfWeek,
  now,
} from "../model/getDays";
import "./ObservationsBlock.css";

export const ObservationsBlock = () => {
  return (
    <div className="observations-wrapper">
      <div className="observations-container">
        <div className="observations-info">
          <p className="observations-title">Observations</p>
          <p className="observations-time">
            Observed at {formatTime(now)}, <br />
            {getDayOfWeek(now)} {getDayFormatted(now)}
          </p>
          <div className="div-outline"></div>
        </div>

        <div className="observations-data"></div>
      </div>
    </div>
  );
};
