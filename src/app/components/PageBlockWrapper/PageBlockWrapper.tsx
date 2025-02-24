import React, { CSSProperties, ReactNode } from "react";
import "./PageBlockWrapper.css";
import { Colors } from "@/app/constants/colors";

interface IPageWrapper {
  children: ReactNode;
  backgroundColor?: string;
  style?: CSSProperties;
}

const PageBlockWrapper: React.FC<IPageWrapper> = ({
  children,
  backgroundColor = Colors.backgroundColorMain,
  style,
}) => {
  return (
    <div className="full-width" style={{ backgroundColor, ...style }}>
      <div className="page-block-wrapper">{children}</div>
    </div>
  );
};

export default PageBlockWrapper;
