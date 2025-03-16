"use client";
import AuthProvider, {
  useAuth,
} from "@/app/components/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ClientComponent = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push("/auth");
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div>
      <p>12312312312</p>
    </div>
  );
};

export default ClientComponent;
