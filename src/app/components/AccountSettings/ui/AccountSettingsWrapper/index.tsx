import React from "react";
import "./style.css";
import ProfileSVG from "@/app/assets/SettingsAssets/ProfileSVG";
import { useSettings } from "@/app/context/ui/SettingsContext";

interface IAccountSettingsWrapper {
  children: React.ReactNode;
}

const AccountSettingsWrapper: React.FC<IAccountSettingsWrapper> = ({
  children,
}) => {
  const { t } = useSettings();
  return (
    <main className="main-account-block">
      <div className="left-content">
        <div className="setting-config-block">
          <ProfileSVG />
          <p>{t("details")}</p>
        </div>
      </div>
      <div className="right-content">{children}</div>
    </main>
  );
};

export default AccountSettingsWrapper;
