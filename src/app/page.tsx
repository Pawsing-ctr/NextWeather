"use client";
import React, { useState } from "react";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import WeatherBlock from "./components/Weather/ui/WeatherBlock/ui/WeatherBlock";
import MapBlock from "./components/MapBlock/MapBlock";
import SettingsBlock from "./components/SettingsBlock/SettingsBlock";
import { Parallax } from "./components/Parallax/Parallax";
import { ObservationsBlock } from "./components/ObservationsBlock/ui/ObservationsBlock";
import AboutBlock from "./components/AboutBlock/ui/AboutBlock";
import { Footer } from "./components/Footer/ui/Footer";
import { Collaborations } from "./components/Collaborations/Collaborations";
import { SettingsProvider } from "./context/SettingsContext/ui/SettingsContext";

export interface WeatherProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const page = () => {
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <SettingsProvider>
      <>
        <Header />
        <Nav setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
        <WeatherBlock
          setSelectedCity={setSelectedCity}
          selectedCity={selectedCity}
        />
        <MapBlock
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <Parallax />
        <ObservationsBlock
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <SettingsBlock />
        <AboutBlock />
        <Collaborations />
        <Footer />
      </>
    </SettingsProvider>
  );
};

export default page;
