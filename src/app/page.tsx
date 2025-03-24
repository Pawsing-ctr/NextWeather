"use client";
import React, { useState } from "react";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import WeatherBlock from "./components/Weather/ui/WeatherBlock/WeatherBlock";
import Map from "./components/Map/Map";
export interface WeatherProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const page = () => {
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <div>
      <Header />
      <Nav setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
      <WeatherBlock
        setSelectedCity={setSelectedCity}
        selectedCity={selectedCity}
      />
      <Map />
    </div>
  );
};

export default page;
