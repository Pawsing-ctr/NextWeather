"use client";
import type React from "react";
import { type FC, useState } from "react";
import "./Nav.css";
import PageBlockWrapper from "../PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import LoopAssets from "@/app/assets/HeaderAssets/LoopAssets";
import CrossSVG from "@/app/assets/RegsitrationAssets/CrossSVG";
import axios from "axios";
import type { WeatherProps } from "@/app/page";
import { useSettings } from "@/app/context/ui/SettingsContext";

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
  const { t } = useSettings();

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
              {t("weather")}
            </p>
          </div>

          <div className="rightSection">
            <div className="input-container">
              <input
                type="text"
                placeholder={t("enterCity")}
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
                      <p className="section-title">{t("myLocations")}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-section">
                      <p className="info-text">
                        {t("infoText1")}
                        <br />
                        {t("infoText2")}
                      </p>
                    </div>
                    <div className="dropdown-section">
                      <p className="section-title">{t("recentSearches")}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-section">
                      <p className="info-text">
                        {t("infoText3")}
                        <br />
                        {t("infoText4")}
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
