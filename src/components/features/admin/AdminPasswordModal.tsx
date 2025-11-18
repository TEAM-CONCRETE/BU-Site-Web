"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Input, Button } from "@/components/ui";
import { useAttendanceLockStore } from "@/stores/attendanceLockStore";
import { useRouter } from "next/navigation";
import { loginApi } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";

export function AdminPasswordModal() {
  const router = useRouter();
  const isOpen = useAttendanceLockStore((state) => state.isAdminModalOpen);
  const closeModal = useAttendanceLockStore((state) => state.closeAdminModal);
  const unlockProgram = useAttendanceLockStore((state) => state.unlockProgram);
  const userId = useAuthStore((state) => state.userId);
  const setAuth = useAuthStore((state) => state.setAuth);

  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setError("사용자 정보를 확인할 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await loginApi({
        username: userId,
        password,
        rememberMe: false,
      });

      setAuth(response.userId, response.role);
      unlockProgram();
      router.push("/");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "비밀번호 검증에 실패했습니다. 다시 시도해주세요.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-textprimary dark:text-white">
          관리자 인증
        </h2>
        <p className="mt-2 text-sm text-textsecondary dark:text-gray-300">
          관리자 비밀번호를 입력하면 관리자 패널로 돌아갑니다.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            type="password"
            label="비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
            error={error ?? undefined}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              className="sm:w-auto"
              onClick={closeModal}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="sm:w-auto"
              disabled={isLoading}
              isLoading={isLoading}
            >
              인증하기
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
