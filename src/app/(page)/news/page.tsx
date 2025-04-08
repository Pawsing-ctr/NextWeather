"use client";
import { Footer } from "@/app/components/Footer/ui/Footer";
import Header from "@/app/components/Header/Header";
import { NewsBlock } from "@/app/components/NewsBlock/ui/NewsBlock/NewsBlock";
import * as React from "react";

const NewsPage = () => {
  return (
    <>
      <Header />
      <NewsBlock />
      <Footer />
    </>
  );
};

export default NewsPage;
