import { ReactNode } from "react";
import "./PageBlockWrapper.css";

interface IPageBlockWrapper {
  children: ReactNode;
}

const PageBlockWrapper: React.FC<IPageBlockWrapper> = ({ children }) => {
  return <div className="page-wrapper">{children}</div>;
};

export default PageBlockWrapper;
