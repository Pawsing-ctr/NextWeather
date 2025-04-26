"use client";

import React, { FC, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import "../MapBlock.css";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import MapClickHandler from "../MapClickHandler/MapClickHandler";

interface MapProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const MapClient: FC<MapProps> = ({ selectedCity, setSelectedCity }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    console.log(selectedCity);
    const fetchCoordinates = async () => {
      if (!selectedCity) return;
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: selectedCity,
              format: "json",
              limit: 1,
            },
          }
        );

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.log("Oh, 404!");
      }
    };

    fetchCoordinates();
  }, [selectedCity]);

  const ViewChange: FC<{ center: [number, number] | null }> = ({ center }) => {
    const map = useMap();

    useEffect(() => {
      if (center) {
        map.setView(center, 10);
      }
    }, [center, map]);
    return null;
  };

  const customIcon = new L.Icon({
    iconUrl: "/custom-marker.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="leaflet-container">
      <MapContainer
        minZoom={3}
        center={position || [51.505, -0.09]}
        zoom={position ? 13 : 3}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler setSelectedCity={setSelectedCity} />

        {position && (
          <Marker position={position} icon={customIcon}>
            <Popup>{selectedCity}</Popup>
          </Marker>
        )}
        <ViewChange center={position} />
      </MapContainer>
    </div>
  );
};

export default MapClient;
