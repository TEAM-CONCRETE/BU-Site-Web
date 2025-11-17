"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useIsAuthenticated, useAuthStore } from "@/stores/authStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useIsAuthenticated();
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    if (pathname === "/login") {
      setIsChecking(false);
      return;
    }

    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsChecking(false);
  }, [isAuthenticated, isInitialized, pathname, router]);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (!isInitialized || isChecking) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
