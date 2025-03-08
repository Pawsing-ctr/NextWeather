"use client";
import React from "react";
import "./AddLocationBtn.css";
import { Plus } from "lucide-react";

const AddLocationBtn = () => {
  return (
    <div className="add-wrapper">
      <button className="add-btn">
        {/* add span for add to your location */}
        <Plus size={18} strokeWidth={2} className="add-icon" />
        <p className="add-text">Add to your location</p>
      </button>
    </div>
  );
};

export default AddLocationBtn;
