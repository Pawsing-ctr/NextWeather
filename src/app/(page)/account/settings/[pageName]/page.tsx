"use client";
import { PersonalDetailsInput } from "@/app/components/AccountSettings/lib";
import AccountSettingsWrapper from "@/app/components/AccountSettings/ui/AccountSettingsWrapper";
import Header from "@/app/components/Header/Header";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./page.css";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import {
  getUserData,
  IUserAccountData,
} from "@/app/GlobalFunc/getUserDataFunc/getUserDataFunc";
import Link from "next/link";
import BeforeFooterBlock from "@/app/components/BeforeFooterBlock/BeforeFooterBlock";
import BaseFooter from "@/app/components/BaseFooter";

const ClientComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState<IUserAccountData>({
    email: "",
    password: "••••••••",
    displayName: "",
    yearOfBirth: "",
  });

  const params = useParams();
  const { pageName } = params;
  console.log(params);

  const { user } = useAuth();

  const currentPage = PersonalDetailsInput.find(
    (el) => el.pageName === pageName
  );

  useEffect(() => {
    getUserData({ setUser: setUserData, user });
  }, [user]);

  useEffect(() => {
    if (currentPage && currentPage.pageName && userData) {
      setInputValue(
        userData[currentPage.pageName as keyof IUserAccountData] || ""
      );
    }
  }, [currentPage, userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Header />
      <PageBlockWrapper>
        <AccountSettingsWrapper>
          <div className="all-settings-change">
            <div className="text-settings-change">
              <p className="title-settings-change">
                {currentPage?.editPage?.editPageTitle}
              </p>
              <p>{currentPage?.editPage?.editPageDescription}</p>
            </div>
            <div>
              <p>{currentPage?.title}</p>
              <input
                className={currentPage?.className}
                type={currentPage?.type}
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="change-button-block">
            <button className="change-button">Save and continue</button>
            <Link className="change-link" href={"/account/settings"}>
              Cancel
            </Link>
          </div>
        </AccountSettingsWrapper>
      </PageBlockWrapper>
      <BeforeFooterBlock />
      <BaseFooter />
    </>
  );
};

export default ClientComponent;
