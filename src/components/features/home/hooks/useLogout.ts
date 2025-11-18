"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isLoading, setIsLoading] = React.useState(false);

  const logout = React.useCallback(async () => {
    try {
      setIsLoading(true);
      // ToDo: 로그아웃 API 호출
      clearAuth();

      // 로그인 페이지로 리다이렉트
      router.push("/login");
      router.refresh();
    } catch {
      clearAuth();
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [clearAuth, router]);

  return {
    logout,
    isLoading,
  };
}
