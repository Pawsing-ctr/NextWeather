import React from "react";
import FormMakeNews from "../FormMakeNews";
import FormAddAdmin from "../FormAddAdmin";
import "./style.css";

const FormsBlock = () => {
  return (
    <div className="all-news-form">
      <FormMakeNews />
      <FormAddAdmin />
    </div>
  );
};

export default FormsBlock;
