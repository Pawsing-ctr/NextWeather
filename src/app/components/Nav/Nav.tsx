import React from "react";
import "./Nav.css";
import PageBlockWrapper from "../PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";

const Nav = () => {
  return (
    <PageBlockWrapper backgroundColor={Colors.backgroundColorNav}>
      <main className="main">
        <div className="wrapper">
          <div className="logo-weather">
            <p className="text-weather">Weather</p>
          </div>

          <div className="rightSection">
            <input
              placeholder="Enter a city"
              type="text"
              className="input-weather"
            />
          </div>
        </div>
      </main>
    </PageBlockWrapper>
  );
};

export default Nav;
