"use client";
import FormsBlock from "@/app/components/AdminMain/ui/FormsBlock";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import Header from "@/app/components/Header/Header";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ClientComponent = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!loading && (!isAuthenticated || !isAdmin)) {
  //     router.push("/");
  //   }
  // }, [isAuthenticated, isAdmin, loading, router]);

  // if (!isAuthenticated || !isAdmin) {
  //   return null;
  // }

  return (
    <>
      <Header />
      <FormsBlock />
    </>
  );
};

export default ClientComponent;
