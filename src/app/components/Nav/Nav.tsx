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

  return (
    <PageBlockWrapper
    // backgroundColor={
    //   !isDropdownOpen ? Colors.backgroundColorNav : Colors.backgroundColorMain
    // }
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
