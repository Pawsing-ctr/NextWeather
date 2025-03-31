"use client";
import React, { useEffect, useState } from "react";
import { PersonalDetailsInput } from "../../lib";
import Link from "next/link";
import "./style.css";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import { getInputValue } from "../../modal";
import AccountSettingsWrapper from "../AccountSettingsWrapper";
import { useRouter } from "next/navigation";

const MainSettingsContent = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "••••••••",
    displayName: "",
    yearOfBirth: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email || "",
        password: "••••••••",
        displayName: user.email.split("@")[0] || "",
        yearOfBirth: user.year ?? "",
      });
    }
  }, [user]);

  return (
    <AccountSettingsWrapper>
      <p className="form-block-title">Personal details</p>
      <div className="all-input-block">
        {PersonalDetailsInput.map((el) => {
          return (
            <div key={el.id}>
              <p>{el.title}</p>
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
                  <button className="input-edit-button">{el.buttonText}</button>
                  {el.buttonIMG}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="delete-account-block">
        <p className="delete-account-title">Delete your account</p>
        <Link className="delete-account-link" href={"/"}>
          I want to delete my account
        </Link>
      </div>
    </AccountSettingsWrapper>
  );
};

export default MainSettingsContent;
