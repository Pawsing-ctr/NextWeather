"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/app/components/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// hf,jnftn

const Header = dynamic(() => import("@/app/components/Header/Header"), {
  ssr: false,
});

const FormsBlock = dynamic(
  () => import("@/app/components/AdminMain/ui/FormsBlock"),
  {
    ssr: false,
  }
);

const AdminPage = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push("/");
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  if (!isClient || loading) {
    return <div className="admin-loading">Loading admin panel...</div>;
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <>
      <Header />
      <FormsBlock />
    </>
  );
};

export default AdminPage;
