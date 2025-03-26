import axios from "axios";
import { LeafletEvent, LeafletMouseEvent } from "leaflet";
import React, { FC } from "react";
import { useMapEvents } from "react-leaflet";

const MapClickHandler: FC<{ setSelectedCity: (city: string) => void }> = ({
  setSelectedCity,
}) => {
  useMapEvents({
    click: async (e: LeafletMouseEvent) => {
      try {
        const { lat, lng } = e.latlng;
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          { params: { lat, lon: lng, format: "json" } }
        );
        if (response.data.display_name) {
          const { city, town, village, state, country } = response.data.address;
          const cleanCity =
            city || town || village || state || country || "Uknown";
          setSelectedCity(cleanCity);
        }
      } catch (error) {
        console.log("404", error);
      }
    },
  });

  return null;
};

export default MapClickHandler;
