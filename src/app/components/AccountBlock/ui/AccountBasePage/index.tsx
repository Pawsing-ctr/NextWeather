"use client";
import Link from "next/link";
import React from "react";
import "./style.css";
import { Colors } from "@/app/constants/colors";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import AccountFooter from "../AccountFooter";

const backIMGStyle = {
  backgroundSize: "50%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const AccountBasePage = () => {
  return (
    <div className="all-account-page">
      <main className="account-main">
        <PageBlockWrapper
          style={{ position: "relative", zIndex: "10", maxHeight: "64px" }}
          backgroundColor={Colors.backgroundColorHeaderAccount}
        >
          <header className="account-header">
            <p className="account-header-title">Your account</p>
            <div className="header-link-block">
              <p className="account-header-link active-link">Overview</p>
              <div className="div-border-link" />
              <Link className="account-header-link" href={"/account-settings"}>
                Settings
              </Link>
              <div className="div-border-link" />
              <Link className="account-header-link" href={"/account-sign-out"}>
                Sign out
              </Link>
            </div>
          </header>
        </PageBlockWrapper>
        <div className="side-bar left-bar" />
        <div className="background-image" />
        <div className="side-bar right-bar" />

        <section className="content-overlay">
          <PageBlockWrapper backgroundColor={Colors.backgroundColorNothing}>
            <div className="welcome-content">
              <h2 className="welcome-title">Lovely to see you here</h2>
              <p className="welcome-text">
                Welcome to your BBC. You can
                <strong>
                  find out more about what you can do with your account.
                </strong>
                Or visit your settings to view and edit your personal info.
              </p>
              <button className="settings-button">
                <Link className="button-link" href={"/account-settings"}>
                  Continue to Settings
                </Link>
              </button>
            </div>
          </PageBlockWrapper>
        </section>
      </main>
      <section>
        <PageBlockWrapper
          style={{
            backgroundImage: Colors.backgroundColorIMGStep,
            ...backIMGStyle,
          }}
        >
          <div className="text-block">
            <p className="title-text">Your privacy and the BBC</p>
            <p className="desctiption-text">
              Want to know whats happening with your info and how you can take
              control?
            </p>
            <Link className="link-text" href={""}>
              Find out more
            </Link>
          </div>
        </PageBlockWrapper>
      </section>
      <AccountFooter />
    </div>
  );
};

export default AccountBasePage;
