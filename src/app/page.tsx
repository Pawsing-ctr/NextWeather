import React from "react";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import WeatherBlock from "./components/Weather/WeatherBlock";

const page = () => {
  return (
    <div>
      <Header />
      <Nav />
      <WeatherBlock />
    </div>
  );
};

export default page;
