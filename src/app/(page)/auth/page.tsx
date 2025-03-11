"use client";
import React, { useState } from "react";
import "./page.css";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import CrossSVG from "@/app/assets/RegsitrationAssets/CrossSVG";
import { useRouter, useSearchParams } from "next/navigation";
import UnauthenticatedRoute from "@/app/components/UnauthenticatedRoute/UnauthenticatedRoute";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import { handleSchemeCheckError } from "@/app/checkErrorFunc/checkErrorFunc";
import { loginUserSchem } from "@/app/scheme/zodScheme";

const ClientComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorResult = handleSchemeCheckError(
      loginUserSchem,
      formData,
      setError
    );

    if (!errorResult) {
      console.log("Данные введены не правильно");
      return;
    }

    try {
      setIsLoading(true);
      setError({});

      await login(formData);

      router.push(decodeURIComponent(returnUrl));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Произошла ошибка при входе");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageBlockWrapper backgroundColor={Colors.backgroundColorAuth}>
      <UnauthenticatedRoute>
        <div className="auth-page">
          <div className="auth-content">
            <div className="auth-title">
              <img className="auth-logo" src="/authLogoIMG.png" alt="" />
              <p className="sign-into-text">Sign into MEX account</p>
            </div>
            {/* {error && <p className="error-message">{error}</p>} */}
            <form className="auth-form-block" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <input
                  className="auth-form-input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="auth-form-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="form-button"
                type="submit"
                disabled={isLoading}
              >
                Login
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
      </UnauthenticatedRoute>
    </PageBlockWrapper>
  );
};

export default ClientComponent;
