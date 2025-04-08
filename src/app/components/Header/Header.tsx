"use client";
import UserAssets from "@/app/assets/HeaderAssets/UserAssets";
import "./Header.css";
import LoopAssets from "@/app/assets/HeaderAssets/LoopAssets";
import PageBlockWrapper from "../PageBlockWrapper/PageBlockWrapper";
import { useAuth } from "../AuthProvider/AuthProvider";
import Link from "next/link";
import { useSettings } from "@/app/context/SettingsContext/ui/SettingsContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { loading } = useAuth();
  const { t } = useSettings();
  const router = useRouter();

  return (
    <PageBlockWrapper>
      <header className="header">
        {loading ? (
          <>
            <div className="logo-header">
              <img
                onClick={() => router.push("/")}
                className="logo-img"
                src="./logoIMG.jpg"
                alt=""
              />
              <div className="user-text">
                <UserAssets width="28px" height="28px" />
                <span>{t("loading")}</span>
              </div>
              <div className="right-user-border" />
            </div>
          </>
        ) : (
          <div className="logo-header">
            <img
              onClick={() => router.push("/")}
              className="logo-img"
              src="./logoIMG.jpg"
              alt=""
            />
            <div className="user-text">
              <UserAssets width="28px" height="28px" />
              {!isAuthenticated ? (
                <Link className="header-link" href={"/auth"}>
                  {t("signIn")}
                </Link>
              ) : (
                <Link className="header-link" href={"/account"}>
                  {t("yourAccount")}
                </Link>
              )}
            </div>
            <div className="right-user-border" />
          </div>
        )}

        <div className="right-header-content">
          <div className="central-navigation-block">
            <Link href={"/"} className="navigation-text">
              {t("home")}
            </Link>
            <Link href={"/news"} className="navigation-text">
              {t("news")}
            </Link>
          </div>
          <div className="button-content">
            <LoopAssets width="20" height="20" />
            <button className="search-button">{t("searchMEX")}</button>
          </div>
        </div>
      </header>
    </PageBlockWrapper>
  );
};

export default Header;
