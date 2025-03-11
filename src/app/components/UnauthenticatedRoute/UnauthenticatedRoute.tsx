"use client";

import React, { useEffect } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";

const UnauthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.replace("/");
    }
  }, [isAuthenticated, loading, router]);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default UnauthenticatedRoute;
