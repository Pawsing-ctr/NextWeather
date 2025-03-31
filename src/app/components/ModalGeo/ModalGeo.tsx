"use client";
import { type FC, useEffect, useState } from "react";
import "./ModalGeo.css";
import { useSettings } from "@/app/context/SettingsContext/ui/SettingsContext";

interface ModalProps {
  onClose: () => void;
  onAccept: () => void;
}

const ModalGeo: FC<ModalProps> = ({ onClose, onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useSettings();

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
        <h1>{t("allowGeolocation")}</h1>
        <p>{t("needLocation")}</p>
        <div className="modal-btns">
          <button className="decline-btn" onClick={handleDecline}>
            {t("decline")}
          </button>
          <button className="accept-btn" onClick={handleAccept}>
            {t("accept")}
          </button>
        </div>
        <p>{t("agreeGeo")}</p>
      </div>
    </div>
  );
};

export default ModalGeo;
