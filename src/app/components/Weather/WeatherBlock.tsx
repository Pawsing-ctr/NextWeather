"use client";
import AddLocationBtn from "@/app/UI/buttons/AddLocationBtn";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ICitiies } from "../Nav/Nav";
import "./WeatherBlock.css";

const WeatherBlock = () => {
  const [searchGeo, setSearchGeo] = useState("");
  const [cities, setCities] = useState<ICitiies[]>([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json/");
        setSearchGeo(response.data.city);
      } catch (error) {
        console.log("Error GEO");
      }
    };
    fetchLocation();
  }, []);

  return (
    <main className="main-block">
      <div className="wrapper-block">
        <div className="location">
          {searchGeo && <p>{searchGeo}</p>}
          {cities.map((city) => (
            <p key={city.name} className="city-option">
              {city.name}, {city.country}
            </p>
          ))}
          <AddLocationBtn />
        </div>
      </div>
    </main>
  );
};

export default WeatherBlock;
