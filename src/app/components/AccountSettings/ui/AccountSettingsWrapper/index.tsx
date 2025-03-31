import React from "react";
import "./style.css";
import ProfileSVG from "@/app/assets/SettingsAssets/ProfileSVG";

interface IAccountSettingsWrapper {
  children: React.ReactNode;
}

const AccountSettingsWrapper: React.FC<IAccountSettingsWrapper> = ({
  children,
}) => {
  return (
    <main className="main-account-block">
      <div className="left-content">
        <div className="setting-config-block">
          <ProfileSVG />
          <p>Personal details</p>
        </div>
      </div>
      <div className="right-content">{children}</div>
    </main>
  );
};

export default AccountSettingsWrapper;
