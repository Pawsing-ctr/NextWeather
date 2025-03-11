"use client";
import React, { FC, useEffect, useState } from "react";
import "./Nav.css";
import PageBlockWrapper from "../PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import LoopAssets from "@/app/assets/HeaderAssets/LoopAssets";
import CrossSVG from "@/app/assets/RegsitrationAssets/CrossSVG";
import axios from "axios";
import { WeatherProps } from "@/app/page";

export interface ICitiies {
  el: number;
  name: string;
  country: string;
  city: string;
}

const Nav: FC<WeatherProps> = ({ setSelectedCity }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cities, setCities] = useState<ICitiies[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCityClick = (city: ICitiies) => {
    setSelectedCity(city.name);
    closeMenu();
  };

  const toggleDropDown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsDropdownOpen(false);
  };

  const fetchCities = async (el: string) => {
    if (el.length < 3) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: el,
            limit: 3,
            appid: "261dbd7e97627a1dd1c935605123e095",
          },
        }
      );
      setCities(response.data);
    } catch (error) {
      console.log("Error API");
    }
  };

  const styles: React.CSSProperties = {
    backgroundColor: "#fff",
    boxShadow: "0 0.125rem 0.9375rem rgba(0, 0, 0, 0.15)",
  };

  return (
    <PageBlockWrapper
      backgroundColor={
        !isDropdownOpen ? Colors.backgroundColorNav : Colors.backgroundColorMain
      }
      style={isDropdownOpen ? styles : undefined}
    >
      <main className="main">
        <div className="wrapper">
          <div className="logo-weather">
            <p
              className={isDropdownOpen ? "text-weather-drop" : "text-weather"}
            >
              Weather
            </p>
          </div>

          <div className="rightSection">
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter a city"
                className="input-weather"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  fetchCities(e.target.value);
                }}
                onClick={toggleDropDown}
                autoFocus={isDropdownOpen}
              />
              <button className="search-icon">
                <LoopAssets width="30" height="30" />
              </button>
              {isDropdownOpen && (
                <button className="close-button" onClick={closeMenu}>
                  <CrossSVG width="26" height="26" />
                </button>
              )}
            </div>
            {isDropdownOpen && (
              <div className="search-dropdown">
                {searchTerm && (
                  <div className="city-menu">
                    {cities.length > 0 && (
                      <div className="dropdown-section city-dropdown">
                        {cities.map((city, index) => (
                          <ul key={index} className="city-ul">
                            <li
                              className="city-li"
                              onClick={() => handleCityClick(city)}
                            >
                              {city.name}, {city.country}
                            </li>
                          </ul>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {!searchTerm && (
                  <div className="dropdown-container">
                    <div className="dropdown-section">
                      <p className="section-title">My locations</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-section">
                      <p className="info-text">
                        We use your postcode to give you relevant local info
                        across the MEX.
                        <br />
                        Add more locations to keep up with what's happening in
                        the places you care about.
                      </p>
                    </div>
                    <div className="dropdown-section">
                      <p className="section-title">Recent searches</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-section">
                      <p className="info-text">
                        You haven't searched for any locations yet.
                        <br />
                        Previous searches will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </PageBlockWrapper>
  );
};

export default Nav;
