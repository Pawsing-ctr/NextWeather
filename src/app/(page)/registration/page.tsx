"use client";
import React, { useState } from "react";
import "../auth/page.css";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import { formInputs } from "@/app/constants/formInputs";
import { initialUser } from "@/app/constants/initialUserConst";
import { handleSchemeCheckError } from "@/app/checkErrorFunc/checkErrorFunc";
import { registrationUserSchem } from "@/app/zodScheme/zodScheme";
import CrossSVG from "@/app/assets/RegsitrationAssets/CrossSVG";

const ClientComponent = () => {
  const [newUser, setNewUser] = useState(initialUser);
  const [error, setError] = useState<Record<string, string>>({});

  const birthdayError = error["day"] || error["month"] || error["year"];

  const handleChangeInput = (value: string, name: string) => {
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorResult = handleSchemeCheckError(
      registrationUserSchem,
      newUser,
      setError
    );
    if (!errorResult) {
      console.log("Данные введены не правильно");
    }
  };

  return (
    <PageBlockWrapper backgroundColor={Colors.backgroundColorAuth}>
      <div className="auth-page">
        <div className="auth-content">
          <div className="auth-title">
            <img className="auth-logo" src="/authLogoIMG.png" alt="" />
            <p className="sign-into-text">Register for a MEX account</p>
            <p className="sign-into-discripton">
              You must be 16 or over to register for a MEX account
            </p>
          </div>
          <form className="auth-form-block">
            <div className="input-wrapper">
              {formInputs.loginInputs.map((el) => {
                return (
                  <>
                    <input
                      key={el.id}
                      type={el.type}
                      className={`${el.className} ${
                        error[el.name] ? "error" : ""
                      }`}
                      name={el.name}
                      placeholder={el.placeholder}
                      onChange={(e) =>
                        handleChangeInput(e.target.value, el.name)
                      }
                    />
                    {error[el.name] && (
                      <p className="error-message">{error[el.name]}</p>
                    )}
                  </>
                );
              })}
              <div className="data-user-birthday">
                {formInputs.dateInputs.map((el) => {
                  return (
                    <div className="all-data-input" key={el.id}>
                      <input
                        key={el.id}
                        type={el.type}
                        className={`${el.className} ${
                          error[el.name] ? "error" : ""
                        }`}
                        name={el.name}
                        placeholder={el.placeholder}
                        onChange={(e) =>
                          handleChangeInput(e.target.value, el.name)
                        }
                      />
                    </div>
                  );
                })}
              </div>
              {birthdayError && (
                <p className="error-message">{birthdayError}</p>
              )}
            </div>
            <button onClick={handleRegistration} className="form-button">
              Continue
            </button>
            <div className="auth-link-block">
              <Link className="auth-link" href={"#"}>
                <p>I have forgotten my email</p>
              </Link>
              <Link className="auth-link" href={"#"}>
                <p>More help signing in</p>
              </Link>
            </div>
          </form>
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
