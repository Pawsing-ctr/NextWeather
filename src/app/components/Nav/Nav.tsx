"use client";
import type React from "react";
import { useState } from "react";
import "./Nav.css";
import PageBlockWrapper from "../PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import LoopAssets from "@/app/assets/HeaderAssets/LoopAssets";

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toogleDropDown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsDropdownOpen(false);
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
      style={!isDropdownOpen ? undefined : styles}
    >
      {!isDropdownOpen ? (
        <main className="main">
          <div className="wrapper">
            <div className="logo-weather">
              <p className="text-weather">Weather</p>
            </div>

            <div className="rightSection">
              <div className="drop-menu">
                <div className="input-container">
                  <input
                    onClick={toogleDropDown}
                    placeholder="Enter a city"
                    type="text"
                    className="input-weather"
                  />
                  <button className="search-icon">
                    <LoopAssets width="30" height="30" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="main">
          <div className="wrapper">
            <div className="logo-weather">
              <p className="text-weather-drop">Weather</p>
            </div>

            <div className="rightSection">
              <div className="drop-menu">
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Enter a city"
                    className="input-weather"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <button className="search-icon">
                    <LoopAssets width="30" height="30" />
                  </button>
                  {/* replace "X" on Icon */}
                  <button className="close-button" onClick={closeMenu}>
                    X
                  </button>
                  {/* need fixit */}
                  <div className="search-dropdown">
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

                    <div className="dropdown-divider"></div>

                    <div className="dropdown-section">
                      <p className="section-title">Recent searches</p>
                    </div>

                    <div className="dropdown-divider"></div>

                    <div className="dropdown-section">
                      <p className="no-searches-text">
                        You haven't searched for any locations yet.
                        <br />
                        Previous searches will appear here.
                      </p>
                    </div>
                  </div>
                  {/* fix div */}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </PageBlockWrapper>
  );
};

export default Nav;
