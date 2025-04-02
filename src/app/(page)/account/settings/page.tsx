import Header from "@/app/components/Header/Header";
import PageBlockWrapper from "@/app/components/PageBlockWrapper/PageBlockWrapper";
import React from "react";
import "./page.css";
import HeaderAccountLink from "@/app/components/AccountBlock/ui/HeaderAccountLink";
import MainSettingsContent from "@/app/components/AccountSettings/ui/MainSettingsContent";
import { Colors } from "@/app/constants/colors";
import BeforeFooterBlock from "@/app/components/BeforeFooterBlock/BeforeFooterBlock";
import { Footer } from "@/app/components/Footer/ui/Footer";

const page = () => {
  return (
    <div>
      <Header />
      <PageBlockWrapper backgroundColor={Colors.backgroundColorSettingsPage}>
        <div className="account-settings-block">
          <HeaderAccountLink
            title="Settings"
            settingsStyle={true}
            activeLink="settings"
          />
          <MainSettingsContent />
        </div>
      </PageBlockWrapper>
      <BeforeFooterBlock
        backgroundColorPage={Colors.backgroundColorSettingsPage}
      />
      <Footer />
    </div>
  );
};

export default page;
