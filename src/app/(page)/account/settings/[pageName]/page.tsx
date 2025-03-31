import AccountSettingsWrapper from "@/app/components/AccountSettings/ui/AccountSettingsWrapper";
import Header from "@/app/components/Header/Header";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import { useParams } from "next/navigation";
import React from "react";

const ClientComponent = () => {
  const params = useParams();
  const { pageName } = params;

  return (
    <>
      <Header />
      <PageBlockWrapper>
        <AccountSettingsWrapper>
          <div>qqqq</div>
        </AccountSettingsWrapper>
      </PageBlockWrapper>
    </>
  );
};

export default ClientComponent;
