"use client";
import { Footer } from "@/app/components/Footer/ui/Footer";
import Header from "@/app/components/Header/Header";
import { SearchBlock } from "@/app/components/SearchBlock/SearchBlock";
import React from "react";

const SearchPage = () => {
  return (
    <>
      <Header />
      <SearchBlock />
      <Footer />
    </>
  );
};

export default SearchPage;
