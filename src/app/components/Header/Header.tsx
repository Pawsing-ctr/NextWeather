import UserAssets from "@/app/assets/HeaderAssets/UserAssets";
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="all-header">
      <div className="left-header-content">
        <div className="logo-and-text-header">
          <img className="logo-img" src="./logoIMG.jpg" alt="" />
          <div className="user-text">
            <UserAssets width="28px" height="28px" />
            <span>Sign in</span>
          </div>
          <div className="right-user-border" />
        </div>
      </div>
      <div className="right-header-content">
        <div className="all-navigation-block">
          <p className="navigation-text">Home</p>
          <p className="navigation-text">News</p>
        </div>
        <div className="header-button">
          <button className="three-point-button">...</button>
          <div>
            <img src="" alt="" />
            <button className="search-button">Search BBC</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
