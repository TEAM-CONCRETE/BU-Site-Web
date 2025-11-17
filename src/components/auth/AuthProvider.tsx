"use client";

import * as React from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuthStore } from "@/stores/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const validateAuth = useAuthStore((state) => state.validateAuth);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  React.useEffect(() => {
    if (!isInitialized) {
      validateAuth();
    }
  }, [isInitialized, validateAuth]);

  return <AuthGuard>{children}</AuthGuard>;
}
