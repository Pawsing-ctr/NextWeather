import React from "react";
import "./Nav.css";

const Nav = () => {
  return (
    <main className="main">
      <div className="wrapper">
        <div className="logo-weather">
          <p className="text-weather">Weather</p>
        </div>

        <div className="rightSection">
          <input placeholder="Enter a city" type="text" className="input-weather" />
        </div>

      </div>
    </main>
  );
};

export default Nav;
