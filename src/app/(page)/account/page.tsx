import AccountBasePage from "@/app/components/AccountBlock/ui/AccountBasePage";
import Header from "@/app/components/Header/Header";
import UnauthenticatedRoute from "@/app/components/UnauthenticatedRoute/UnauthenticatedRoute";
import React from "react";

const page = () => {
  return (
    <>
      <UnauthenticatedRoute>
        <Header />
        <AccountBasePage />
      </UnauthenticatedRoute>
    </>
  );
};

export default page;
