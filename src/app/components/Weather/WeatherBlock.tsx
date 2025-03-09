"use client";
import AddLocationBtn from "@/app/UI/buttons/AddLocationBtn";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ICitiies } from "../Nav/Nav";
import "./WeatherBlock.css";
import ModalGeo from "../ModalGeo/ModalGeo";

const WeatherBlock = () => {
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
            <p>{searchGeo ? searchGeo : "Your city..."}</p>
            {cities.map((city) => (
              <p key={city.name} className="city-option">
                {city.name}, {city.country}
              </p>
            ))}
            <AddLocationBtn />
          </div>
        </div>
      </main>
    </>
  );
};

export default WeatherBlock;
