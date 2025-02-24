import UserAssets from "@/app/assets/HeaderAssets/UserAssets";
import React from "react";
import "./Header.css";
// import Link from "next/link";
// import Image from "next/image";
import LoopAssets from "@/app/assets/HeaderAssets/LoopAssets";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-header">
        <img className="logo-img" src="./logoIMG.jpg" alt="" />
        <div className="user-text">
          <UserAssets width="28px" height="28px" />
          <span>Sign in</span>
        </div>
        <div className="right-user-border" />
      </div>

      <div className="right-header-content">
        <div className="central-navigation-block">
          <p className="navigation-text">Home</p>
          <p className="navigation-text">News</p>
        </div>
        <div className="button-content">
          <LoopAssets width="20" height="20" />
          <button className="search-button">Search MEX</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
