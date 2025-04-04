import React from "react";
import "./PasswordConditions.css";

interface IPasswordConditions {
  black: boolean;
}

const PasswordConditions: React.FC<IPasswordConditions> = ({
  black = true,
}) => {
  return (
    <div className="conditions-block">
      <p
        className={
          black
            ? "conditions-block-title"
            : "conditions-block-title-registration"
        }
      >
        Passwords need to include...
      </p>
      <ul
        className={black ? "conditions-block" : "conditions-block-registration"}
      >
        <li
          className={black ? "conditions-list" : "conditions-list-registration"}
        >
          At least eight characters
        </li>
        <li
          className={black ? "conditions-list" : "conditions-list-registration"}
        >
          At least one letter
        </li>
        <li
          className={black ? "conditions-list" : "conditions-list-registration"}
        >
          At least one number or symbol
        </li>
      </ul>
    </div>
  );
};

export default PasswordConditions;
