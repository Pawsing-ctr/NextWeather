"use client";
import Link from "next/link";
import React from "react";
import "./style.css";
import { Colors } from "@/app/constants/colors";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Footer } from "@/app/components/Footer/ui/Footer";
import HeaderAccountLink from "../HeaderAccountLink";
import BeforeFooterBlock from "@/app/components/BeforeFooterBlock/BeforeFooterBlock";
import { useSettings } from "@/app/context/ui/SettingsContext";
const AccountBasePage = () => {
  const { t } = useSettings();

  return (
    <div className="all-account-page">
      <main className="account-main">
        <PageBlockWrapper
          style={{ position: "relative", zIndex: "10", maxHeight: "64px" }}
          backgroundColor={Colors.backgroundColorHeaderAccount}
        >
          <HeaderAccountLink
            title="account_header_title_main"
            activeLink="overview"
          />
        </PageBlockWrapper>
        <div className="side-bar left-bar" />
        <div className="background-image" />
        <div className="side-bar right-bar" />

        <section className="content-overlay">
          <PageBlockWrapper backgroundColor={Colors.backgroundColorNothing}>
            <div className="welcome-content">
              <h2 className="welcome-title">{t("account_welcome_title")}</h2>
              <p className="welcome-text">
                {t("account_welcome_text_part1")}
                <strong>{t("account_welcome_text_strong")}</strong>
                {t("account_welcome_text_part2")}
              </p>
              <button className="settings-button">
                <Link className="button-link" href={"/account/settings"}>
                  {t("account_welcome_button_settings")}
                </Link>
              </button>
            </div>
          </PageBlockWrapper>
        </section>
      </main>
      <BeforeFooterBlock />
      <Footer />
    </div>
  );
};

export default AccountBasePage;
