import React from "react";
import "./PasswordConditions.css";
import { useSettings } from "@/app/context/ui/SettingsContext";

interface IPasswordConditions {
  black: boolean;
}

const PasswordConditions: React.FC<IPasswordConditions> = ({
  black = true,
}) => {
  const { t } = useSettings();

  return (
    <div className="conditions-block">
      <p
        className={
          black
            ? "conditions-block-title"
            : "conditions-block-title-registration"
        }
      >
        {t("reg_password_condition_title")}
      </p>
      <ul
        className={black ? "conditions-block" : "conditions-block-registration"}
      >
        <li
          className={black ? "conditions-list" : "conditions-list-registration"}
        >
          {t("reg_password_condition_chars")}
        </li>
        <li
          className={black ? "conditions-list" : "conditions-list-registration"}
        >
          {t("reg_password_condition_letter")}
        </li>
        <li
          className={black ? "conditions-list" : "conditions-list-registration"}
        >
          {t("reg_password_condition_number")}
        </li>
      </ul>
    </div>
  );
};

export default PasswordConditions;
