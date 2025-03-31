import Link from "next/link";
import React from "react";
import "./style.css";
import { AcountHeaderLink } from "../../lib";

interface IHeaderProps {
  title: string;
  settingsStyle?: boolean;
  activeLink?: string;
}

const HeaderAccountLink: React.FC<IHeaderProps> = ({
  title,
  activeLink,
  settingsStyle = false,
}) => {
  return (
    <header className="account-header">
      <p
        className={`${
          settingsStyle ? "settings-header-title" : "account-header-title"
        }`}
      >
        {title}
      </p>
      <div className="header-link-block">
        {AcountHeaderLink.map((el) => {
          return (
            <div key={el.id} className="header-link-block">
              <Link
                className={`account-header-link
                   ${
                     activeLink === el.isActive
                       ? settingsStyle
                         ? "active-settings-link"
                         : "active-link"
                       : ""
                   }
                    ${settingsStyle ? "settings-link" : ""}`}
                href={el.href}
              >
                {el.title}
              </Link>
              <div
                className={`${
                  settingsStyle ? "settings-div-link" : "div-border-link"
                }`}
              />
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default HeaderAccountLink;
