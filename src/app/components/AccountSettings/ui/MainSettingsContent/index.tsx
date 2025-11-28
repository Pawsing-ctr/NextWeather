"use client";
import React, { useEffect, useState } from "react";
import { PersonalDetailsInput } from "../../lib";
import Link from "next/link";
import "./style.css";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import { getInputValue } from "../../modal";
import AccountSettingsWrapper from "../AccountSettingsWrapper";
import { useRouter } from "next/navigation";
import {
  getUserData,
  IUserAccountData,
} from "@/app/GlobalFunc/getUserDataFunc/getUserDataFunc";
import { useSettings } from "@/app/context/ui/SettingsContext";

const MainSettingsContent = () => {
  const { t } = useSettings();

  const [userData, setUserData] = useState<IUserAccountData>({
    email: "",
    password: "••••••••",
    displayName: "",
    yearOfBirth: "",
  });

  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    getUserData({ setUser: setUserData, user, hidePassword: true });
  }, [user]);

  return (
    <AccountSettingsWrapper>
      <p className="form-block-title">{t("settings_personal_details_title")}</p>
      <div className="all-input-block">
        {PersonalDetailsInput.map((el) => {
          return (
            <div key={el.id}>
              <p>{t(el.title)}</p>
              <div className="input-edit-block">
                <input
                  className={el.className}
                  type={el.type}
                  value={getInputValue(el.id, userData)}
                  readOnly
                />
                <div
                  onClick={() =>
                    router.push(`/account/settings/${el.pageName}`)
                  }
                  className="button-block"
                >
                  <button className="input-edit-button">
                    {t(el.buttonText)}
                  </button>
                  {el.buttonIMG}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="delete-account-block">
        <p className="delete-account-title">
          {t("settings_delete_account_title")}
        </p>
        <Link className="delete-account-link" href={"/"}>
          {t("settings_delete_account_link")}
        </Link>
      </div>
    </AccountSettingsWrapper>
  );
};

export default MainSettingsContent;
