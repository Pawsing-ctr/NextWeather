"use client";
import React, { FC, useEffect, useState } from "react";
import "./ModalGeo.css";

interface ModalProps {
  onClose: () => void;
  onAccept: () => void;
}

const ModalGeo: FC<ModalProps> = ({ onClose, onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const geoContent = sessionStorage.getItem("geoConsent");

    if (!geoContent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("geoConsent", "accepted");
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    sessionStorage.setItem("geoConsent", "declined");
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Allow Geolocation?</h1>
        <p>We need your location to show weather data</p>
        <div className="modal-btns">
          <button className="decline-btn" onClick={handleDecline}>
            Decline
          </button>
          <button className="accept-btn" onClick={handleAccept}>
            Accept
          </button>
        </div>
        <p>Do your agree from geo?</p>
      </div>
    </div>
  );
};

export default ModalGeo;
