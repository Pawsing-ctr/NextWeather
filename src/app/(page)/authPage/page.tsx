import React from "react";
import "./page.css";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";

const page = () => {
  return (
    <PageBlockWrapper backgroundColor={Colors.backgroundColorAuth}>
      <div className="auth-page">
        <div className="auth-content">
          <div className="auth-title">
            <img className="auth-logo" src="/authLogoIMG.png" alt="" />
            <p className="sign-into-text">Sign into MEX account</p>
            <p className="enter-email-text">Enter your email</p>
          </div>
          <form className="auth-form-block" action="">
            <div className="input-wrapper">
              <input
                className="auth-form-input"
                type="text"
                placeholder="Email"
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
            <Link href={"#"}>
              <p className="auth-link">Register now</p>
            </Link>
          </div>
        </div>
        <div>
          <img
            className="background-img"
            src="./authBackgroundIMG.png"
            alt=""
          />
        </div>
      </div>
    </PageBlockWrapper>
  );
};

export default page;
