import React, { CSSProperties, ReactNode } from "react";
import "./PageBlockWrapper.css";
import { Colors } from "@/app/constants/colors";

interface IPageWrapper {
  children: ReactNode;
  backgroundColor?: string;
  style?: CSSProperties;
  backgroundImage?: string;
}

const PageBlockWrapper: React.FC<IPageWrapper> = ({
  children,
  backgroundColor = Colors.backgroundColorMain,
  style,
  backgroundImage,
}) => {
  return (
    <div
      className="full-width"
      style={{ backgroundColor, backgroundImage, ...style }}
    >
      <div className="page-block-wrapper">{children}</div>
    </div>
  );
};

export default PageBlockWrapper;
