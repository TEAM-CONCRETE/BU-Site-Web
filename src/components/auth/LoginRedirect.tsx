"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useIsAuthenticated } from "@/stores/authStore";

export function LoginRedirect() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
      router.refresh();
    }
  }, [isAuthenticated, router]);

  return null;
}
