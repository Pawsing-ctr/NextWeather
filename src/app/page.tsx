"use client";
import React, { useState } from "react";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import WeatherBlock from "./components/Weather/ui/WeatherBlock/WeatherBlock";
import HourlyCast from "./components/Weather/ui/HourlyCast/HourlyCast";

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
      <HourlyCast />
    </div>
  );
};

export default page;
