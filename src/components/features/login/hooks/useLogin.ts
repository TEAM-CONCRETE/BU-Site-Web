"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginApi, type LoginRequest } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (request: LoginRequest) => {
      const data = await loginApi(request);

      if (data.role !== "ROLE_MANAGER") {
        throw new Error(
          "현장 관리자만 로그인할 수 있습니다. 다른 계정으로 로그인해주세요."
        );
      }

      return data;
    },
    onSuccess: (data) => {
      setAuth(data.userId, data.role);
      router.push("/");
      router.refresh();
    },
    onError: () => undefined,
  });
}
