"use client";
import React, { useState } from "react";
import "./Nav.css";
import PageBlockWrapper from "../PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import LoopAssets from "@/app/assets/HeaderAssets/LoopAssets";

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toogleDropDown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const styles: React.CSSProperties = {
    display: "flex",
    width: "100%",
    backgroundColor: "#fff",
    textTransform: "uppercase",
    justifyContent: "space-between",
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
                    onBlur={() => setIsDropdownOpen(false)}
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
        <div className="main-menu">
          <div className="wrapper-menu">
            <div className="logo-weather">
              <p className="text-weather">Weather</p>
            </div>
          </div>
        </div>
      )}
    </PageBlockWrapper>
  );
};

export default Nav;
