"use client";
import React, { useState } from "react";
import "./page.css";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import { formInputs } from "@/app/constants/formInputs";
import { initialUser } from "@/app/constants/initialUserConst";
import { handleSchemeCheckError } from "@/app/GlobalFunc/checkErrorFunc/checkErrorFunc";
import { registrationUserSchem } from "@/app/scheme/zodScheme";
import CrossSVG from "@/app/assets/RegsitrationAssets/CrossSVG";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import PasswordConditions from "@/app/components/PasswordConditions/PasswordConditions";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ClientComponent = () => {
  const [newUser, setNewUser] = useState(initialUser);
  const [error, setError] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

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
      router.push("/");
    } catch (error: any) {
      setServerError(
        error.response?.data?.message || "Ошибка при регистрации пользователя"
      );
    }
  };

  return (
    <div className="registration-page-wrapper">
      <PageBlockWrapper backgroundColor={Colors.backgroundColorAuth}>
        <div className="registration-page">
          <div className="registration-content">
            <div className="registration-title">
              <Image width={140} height={40} src={"/authLogoIMG.png"} alt="" />
              <p className="registration-text">Register for a MEX account</p>
              <p className="registration-discripton">
                You must be 16 or over to register for a MEX account
              </p>
            </div>

            {serverError && <div className="error-message">{serverError}</div>}

            <form
              onSubmit={handleRegistSubmit}
              className="registration-form-block"
            >
              <div className="input-wrapper">
                {formInputs.loginInputs.map((el) => {
                  return (
                    <div className="input-block" key={el.id}>
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
                      {el.name === "password" ? (
                        <PasswordConditions black={false} />
                      ) : (
                        ""
                      )}

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
              <button type="submit" className="form-button">
                Continue
              </button>
              <div className="registration-link-block">
                <Link className="registration-link" href={"#"}>
                  <p>I have forgotten my email</p>
                </Link>
                <Link className="registration-link" href={"#"}>
                  <p>More help signing in</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </PageBlockWrapper>
      <div className="registration-exit-button">
        <Link className="link-button" href={"/"}>
          <button className="close-button">
            <CrossSVG width="16" height="16" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ClientComponent;
