"use client";
import React from "react";
import "./page.css";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import CrossSVG from "@/app/assets/RegsitrationAssets/CrossSVG";

const ClientComponent = () => {
  return (
    <PageBlockWrapper backgroundColor={Colors.backgroundColorAuth}>
      <div className="auth-page">
        <div className="auth-content">
          <div className="auth-title">
            <img className="auth-logo" src="/authLogoIMG.png" alt="" />
            <p className="sign-into-text">Sign into MEX account</p>
          </div>
          <form className="auth-form-block" action="">
            <div className="input-wrapper">
              <input
                className="auth-form-input"
                type="text"
                name="email"
                placeholder="Email"
              />
              <input
                className="auth-form-input"
                type="text"
                name="password"
                placeholder="Password"
              />
            </div>
            <button className="form-button">Continue</button>
            <div className="auth-link-block">
              <Link className="auth-link" href={"#"}>
                <p>I have forgotten my email</p>
              </Link>
              <Link className="auth-link" href={"#"}>
                <p>More help signing in</p>
              </Link>
            </div>
          </form>
          <div className="registration-route-link-block">
            <p className="registration-route-link-title">
              Don&apos;t have a MEX account?
            </p>
            <Link href={"/registration"}>
              <p className="auth-link">Register now</p>
            </Link>
          </div>
        </div>
        <div className="background-and-button">
          <img
            className="background-img"
            src="./authBackgroundIMG.png"
            alt=""
          />
          <Link className="link-button" href={"/"}>
            <button className="close-button">
              <CrossSVG width="16" height="16" />
            </button>
          </Link>
        </div>
      </div>
    </PageBlockWrapper>
  );
};

export default ClientComponent;
