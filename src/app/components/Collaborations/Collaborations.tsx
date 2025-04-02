import React from "react";
import Link from "next/link";
import "./Collaborations.css";

export const Collaborations = () => {
  return (
    <div className="wrapper-collab">
      <div className="container-collab">
        <div className="text-collab">
          <p>
            Mex Weather in association with{" "}
            <Link className="link-collab" href={"https://openweathermap.org/"}>
              OpenWeather
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

