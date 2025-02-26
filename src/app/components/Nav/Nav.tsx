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
    <PageBlockWrapper backgroundColor={Colors.backgroundColorNav}>
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

              {isDropdownOpen && (
                <div className="dropdown-content">
                  <div className="drop-inner">
                    <div className="logo-weather">
                      <p className="text-weather">Weather</p>
                    </div>
                    {/* fix this */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageBlockWrapper>
  );
};

export default Nav;
