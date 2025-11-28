"use client";
import { Footer } from "@/app/components/Footer/ui/Footer";
import Header from "@/app/components/Header/Header";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import Link from "next/link";
import React, { useEffect } from "react";
import "./page.css";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";
import { useSettings } from "@/app/context/ui/SettingsContext";

const ClientComponent = () => {
  const { logout } = useAuth();
  const { t } = useSettings();

  const router = useRouter();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="all-signount-page">
      <Header />
      <PageBlockWrapper>
        <div className="all-signount-block">
          <p className="signount-title">{t("signout_message")}</p>
          <div className="button-block">
            <button
              onClick={() => router.push("/")}
              className="signount-button"
            >
              {t("signout_button_continue")}
            </button>
            <p className="signount-text">
              {t("signout_text_or")}
              <Link className="signount-link" href={"/auth"}>
                {t("signout_link_signin")}
              </Link>

              {t("signout_text_again")}
            </p>
          </div>
        </div>
      </PageBlockWrapper>
      <Footer />
    </div>
  );
};

export default ClientComponent;
