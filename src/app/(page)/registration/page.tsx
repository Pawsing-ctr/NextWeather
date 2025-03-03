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

const ClientComponent = () => {
  const [newUser, setNewUser] = useState(initialUser);
  const [error, setError] = useState<Record<string, string>>({});

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
            <p className="sign-into-text">Register for a BBC account</p>
            <p>You must be 16 or over to register for a BBC account</p>
          </div>
          <form className="auth-form-block">
            <div className="input-wrapper">
              {formInputs.loginInputs.map((el) => {
                const errorMessage = error[el.name];
                return (
                  <>
                    <input
                      key={el.id}
                      type={el.type}
                      className={el.className}
                      name={el.name}
                      placeholder={el.placeholder}
                      onChange={(e) =>
                        handleChangeInput(e.target.value, el.name)
                      }
                    />
                    <p className="error-message">{errorMessage}</p>
                  </>
                );
              })}
              <div className="data-user-birthday">
                {formInputs.dateInputs.map((el) => {
                  const errorMessage = error[el.name];
                  return (
                    <>
                      <input
                        key={el.id}
                        type={el.type}
                        className={el.className}
                        name={el.name}
                        placeholder={el.placeholder}
                        onChange={(e) =>
                          handleChangeInput(e.target.value, el.name)
                        }
                      />
                      <p className="error-message">{errorMessage}</p>
                    </>
                  );
                })}
              </div>
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
        <img className="background-img" src="./authBackgroundIMG.png" alt="" />
      </div>
    </PageBlockWrapper>
  );
};

export default ClientComponent;
