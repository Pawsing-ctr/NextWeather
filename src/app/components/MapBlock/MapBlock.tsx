"use client";

import React, { FC } from "react";
import dynamic from "next/dynamic";

interface MapProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const MapClient = dynamic(() => import("./MapClient/MapClient"), {
  ssr: false,
});

const MapBlock: FC<MapProps> = ({ selectedCity, setSelectedCity }) => {
  return (
    <div style={{ width: "100%" }}>
      <MapClient
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </div>
  );
};

export default MapBlock;
