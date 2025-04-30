"use client";
import { Footer } from "@/app/components/Footer/ui/Footer";
import Header from "@/app/components/Header/Header";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import Link from "next/link";
import React, { useEffect } from "react";
import "./page.css";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";

const ClientComponent = () => {
  const { logout } = useAuth();

  const router = useRouter();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="all-signount-page">
      <Header />
      <PageBlockWrapper>
        <div className="all-signount-block">
          <p className="signount-title">
            You&apos;ve signed out, sorry to see you go.
          </p>
          <div className="button-block">
            <button
              onClick={() => router.push("/")}
              className="signount-button"
            >
              Continue
            </button>
            <p className="signount-text">
              Or{" "}
              <Link className="signount-link" href={"/auth"}>
                Sign in
              </Link>{" "}
              again
            </p>
          </div>
        </div>
      </PageBlockWrapper>
      <Footer />
    </div>
  );
};

export default ClientComponent;
