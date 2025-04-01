"use client";
import React, { useState } from "react";
import "../auth/page.css";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import { formInputs } from "@/app/constants/formInputs";
import { initialUser } from "@/app/constants/initialUserConst";
import { handleSchemeCheckError } from "@/app/GlobalFunc/checkErrorFunc/checkErrorFunc";
import { registrationUserSchem } from "@/app/scheme/zodScheme";
import CrossSVG from "@/app/assets/RegsitrationAssets/CrossSVG";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import UnauthenticatedRoute from "@/app/components/UnauthenticatedRoute/UnauthenticatedRoute";

const ClientComponent = () => {
  const [newUser, setNewUser] = useState(initialUser);
  const [error, setError] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register } = useAuth();

  const birthdayError = error["day"] || error["month"] || error["year"];

  const handleChangeInput = (value: string, name: string) => {
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error[name]) {
      setError((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRegistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setServerError(null);

    const errorResult = handleSchemeCheckError(
      registrationUserSchem,
      newUser,
      setError
    );
    if (!errorResult) {
      console.log("Данные введены не правильно");
      return;
    }
    try {
      await register(newUser.email, newUser.password, {
        day: newUser.day,
        month: newUser.month,
        year: newUser.year,
      });

      setNewUser(initialUser);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setServerError(
        error.response?.data?.message || "Ошибка при регистрации пользователя"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <PageBlockWrapper backgroundColor={Colors.backgroundColorAuth}>
      <UnauthenticatedRoute>
        <div className="auth-page">
          <div className="auth-content">
            <div className="auth-title">
              <img className="auth-logo" src="/authLogoIMG.png" alt="" />
              <p className="sign-into-text">Register for a MEX account</p>
              <p className="sign-into-discripton">
                You must be 16 or over to register for a MEX account
              </p>
            </div>

            {serverError && (
              <div className="server-error-message">{serverError}</div>
            )}

            <form onSubmit={handleRegistSubmit} className="auth-form-block">
              <div className="input-wrapper">
                {formInputs.loginInputs.map((el) => {
                  return (
                    <div key={el.id}>
                      <input
                        type={el.type}
                        className={`${el.className} ${
                          error[el.name] ? "error" : ""
                        }`}
                        name={el.name}
                        placeholder={el.placeholder}
                        onChange={(e) =>
                          handleChangeInput(e.target.value, el.name)
                        }
                        value={newUser[el.name as keyof typeof newUser] || ""}
                      />
                      {error[el.name] && (
                        <p className="error-message">{error[el.name]}</p>
                      )}
                    </div>
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
                          value={newUser[el.name as keyof typeof newUser] || ""}
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="form-button"
              >
                {isSubmitting ? "Registration..." : "Continue"}
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
      </UnauthenticatedRoute>
    </PageBlockWrapper>
  );
};

export default ClientComponent;
