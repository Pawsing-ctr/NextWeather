import React, { FC, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import "./MapBlock.css";
import "leaflet/dist/leaflet.css";
import axios from "axios";

interface MapProps {
  selectedCity: string;
}

const Map: FC<MapProps> = ({ selectedCity }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
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

  return (
    <div className="leaflet-container">
      <MapContainer
        minZoom={3}
        center={position || [51.505, -0.09]}
        zoom={position ? 13 : 3}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && (
          <Marker position={position}>
            <Popup>{selectedCity}</Popup>
          </Marker>
        )}
        <ViewChange center={position} />
      </MapContainer>
    </div>
  );
};

export default Map;

// need fixes. Search city update.
// position [51.505, -0.09] fix
