import React from "react";
import "./Widget.css";
import Image from "next/image";
import { adsData } from "../../data/ads";
import { useSettings } from "@/app/context/ui/SettingsContext";

const Widget = () => {
  const random = Math.floor(Math.random() * adsData.length);
  const ad = adsData[random];
  const { t } = useSettings();

  return (
    <div className="widget-container">
      <a href={ad.link} target="_blank">
        <Image
          width={512}
          height={512}
          className="auth-logo"
          src={ad.image}
          alt="Logo"
          priority
        />
        <div>
          <h3>{ad.title}</h3>
          <p>{t(ad.description)}</p>
        </div>
      </a>
    </div>
  );
};

export default Widget;
