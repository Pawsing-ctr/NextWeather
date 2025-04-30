"use client";
import React, { useState, Suspense } from "react";
import "./page.css";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import { handleSchemeCheckError } from "@/app/GlobalFunc/checkErrorFunc/checkErrorFunc";
import { loginUserSchem } from "@/app/scheme/zodScheme";
import Image from "next/image";

const AuthFormContent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
      console.log("Invalid form data");
      return;
    }

    setIsLoading(true);
    setError({});

    const response = await login(formData);

    if (response.status === 200) {
      router.push("/");
    }

    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-content">
        <div className="auth-title">
          <Image
            width={512}
            height={512}
            className="auth-logo"
            src="/authLogoIMG.png"
            onClick={() => router.push("/")}
            alt="Logo"
            priority
          />
          <p className="sign-into-text">Sign into MEX account</p>
        </div>
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
            {error.email && <p className="error-message">{error.email}</p>}

            <input
              className="auth-form-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error.password && (
              <p className="error-message">{error.password}</p>
            )}
          </div>
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <div className="auth-link-block">
            <Link className="auth-link" href="/forgot-email">
              <p>I have forgotten my email</p>
            </Link>
            <Link className="auth-link" href="/help">
              <p>More help signing in</p>
            </Link>
          </div>
        </form>
        <div className="registration-route-link-block">
          <p className="registration-route-link-title">
            Don&apos;t have a MEX account?
          </p>
          <Link href="/registration" className="auth-link">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  return (
    <PageBlockWrapper backgroundColor={Colors.backgroundColorAuth}>
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <AuthFormContent />
      </Suspense>
    </PageBlockWrapper>
  );
};

export default AuthPage;
