"use client";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { ICitiies } from "../Nav/Nav";
import "./WeatherBlock.css";
import ModalGeo from "../ModalGeo/ModalGeo";
import { WeatherProps } from "@/app/page";

const WeatherBlock: FC<WeatherProps> = ({ setSelectedCity, selectedCity }) => {
  const [searchGeo, setSearchGeo] = useState("");
  const [cities, setCities] = useState<ICitiies[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isGeoAllowed, setIsGeoAllowed] = useState(false);

  useEffect(() => {
    if (!isGeoAllowed) return;

    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json/");
        setSearchGeo(response.data.city);
      } catch (error) {
        console.log("Error GEO");
      }
    };
    fetchLocation();
  }, [isGeoAllowed]);

  const displayCity = selectedCity || searchGeo || "Your city...";

  return (
    <>
      {isModalOpen && (
        <ModalGeo
          onClose={() => setIsModalOpen(false)}
          onAccept={() => {
            setIsGeoAllowed(true);
            setIsModalOpen(false);
          }}
        />
      )}
      <main className="main-block">
        <div className="wrapper-block">
          <div className="location">
            <p>{displayCity}</p>
            {cities.map((city) => (
              <p key={city.name} className="city-option">
                {city.name}, {city.country}
              </p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default WeatherBlock;
