import React from "react";
import PageBlockWrapper from "../PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import "./BeforeFooterBlock.css";
import { useSettings } from "@/app/context/ui/SettingsContext";
const backIMGStyle = {
  backgroundSize: "50%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

interface IBeforeFooterBlock {
  backgroundColorPage?: string;
}

const BeforeFooterBlock: React.FC<IBeforeFooterBlock> = ({
  backgroundColorPage,
}) => {
  const { t } = useSettings();

  return (
    <section>
      <PageBlockWrapper
        backgroundColor={backgroundColorPage}
        style={{
          backgroundImage: Colors.backgroundColorIMGStep,
          ...backIMGStyle,
        }}
      >
        <div className="text-block">
          <p className="title-text">{t("privacy_title")}</p>
          <p className="desctiption-text">{t("privacy_description")}</p>
          <Link className="link-text" href={""}>
            {t("privacy_link_text")}
          </Link>
        </div>
      </PageBlockWrapper>
    </section>
  );
};

export default BeforeFooterBlock;
