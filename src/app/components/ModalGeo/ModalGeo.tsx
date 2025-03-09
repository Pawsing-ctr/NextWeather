"use client";
import React, { FC } from "react";
import "./ModalGeo.css";

interface ModalProps {
  onClose: () => void;
  onAccept: () => void;
}

const ModalGeo: FC<ModalProps> = ({ onClose, onAccept }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Allow Geolocation?</h1>
        <p>We need your location to show weather data</p>
        <div className="modal-btns">
          <button className="decline-btn" onClick={onClose}>
            Decline
          </button>
          <button className="accept-btn" onClick={onAccept}>
            Accept
          </button>
        </div>
        <p>Do your agree from geo?</p>
      </div>
    </div>
  );
};

export default ModalGeo;
