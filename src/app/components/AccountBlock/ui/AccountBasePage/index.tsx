"use client";
import Link from "next/link";
import React from "react";
import "./style.css";
import { Colors } from "@/app/constants/colors";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import BaseFooter from "../../../BaseFooter";
import HeaderAccountLink from "../HeaderAccountLink";
import BeforeFooterBlock from "@/app/components/BeforeFooterBlock/BeforeFooterBlock";

const AccountBasePage = () => {
  return (
    <div className="all-account-page">
      <main className="account-main">
        <PageBlockWrapper
          style={{ position: "relative", zIndex: "10", maxHeight: "64px" }}
          backgroundColor={Colors.backgroundColorHeaderAccount}
        >
          <HeaderAccountLink title="Your account" activeLink="overview" />
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
                <Link className="button-link" href={"/account/settings"}>
                  Continue to Settings
                </Link>
              </button>
            </div>
          </PageBlockWrapper>
        </section>
      </main>
      <BeforeFooterBlock />
      <BaseFooter />
    </div>
  );
};

export default AccountBasePage;
