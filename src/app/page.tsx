"use client";
import React, { useState } from "react";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import WeatherBlock from "./components/Weather/ui/WeatherBlock/WeatherBlock";
import Map from "./components/MapBlock/MapBlock";
import SettingsBlock from "./components/SettingsBlock/SettingsBlock";
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
      <Map selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <SettingsBlock />
    </div>
  );
};

export default page;
