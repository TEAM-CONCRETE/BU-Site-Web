"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
