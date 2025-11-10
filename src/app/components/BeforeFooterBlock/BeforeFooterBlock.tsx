import React from "react";
import PageBlockWrapper from "../PageBlockWrapper/PageBlockWrapper";
import { Colors } from "@/app/constants/colors";
import Link from "next/link";
import "./BeforeFooterBlock.css";

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
          <p className="title-text">Your privacy and the MEX</p>
          <p className="desctiption-text">
            Want to know whats happening with your info and how you can take
            control?
          </p>
          <Link className="link-text" href={""}>
            Find out more
          </Link>
        </div>
      </PageBlockWrapper>
    </section>
  );
};

export default BeforeFooterBlock;
