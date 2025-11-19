"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/common";
import { Input, Button } from "@/components/ui";
import { useAttendanceLockStore } from "@/stores/attendanceLockStore";
import { useAttendanceSessionStore } from "@/stores/attendanceSessionStore";
import {
  formatPhoneNumber,
  stripPhoneNumberFormatting,
} from "@/utils/phoneNumberFormatter";

export default function AttendancePhonePage() {
  const router = useRouter();
  const isProgramLocked = useAttendanceLockStore(
    (state) => state.isProgramLocked
  );
  const hasHydrated = useAttendanceLockStore((state) => state.hasHydrated);
  const openAdminModal = useAttendanceLockStore(
    (state) => state.openAdminModal
  );
  const sessionHasHydrated = useAttendanceSessionStore(
    (state) => state.hasHydrated
  );
  const setSessionPhoneNumber = useAttendanceSessionStore(
    (state) => state.setPhoneNumber
  );
  const clearSessionPhoneNumber = useAttendanceSessionStore(
    (state) => state.clearPhoneNumber
  );

  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isProgramLocked) {
      router.replace("/");
    }
  }, [hasHydrated, isProgramLocked, router]);

  React.useEffect(() => {
    if (!sessionHasHydrated) {
      return;
    }
    clearSessionPhoneNumber();
  }, [clearSessionPhoneNumber, sessionHasHydrated]);

  const handlePhoneChange = (value: string) => {
    setError(null);
    setPhone(formatPhoneNumber(value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = stripPhoneNumberFormatting(phone);

    if (normalized.length < 9 || normalized.length > 11) {
      setError("전화번호를 정확히 입력해주세요.");
      return;
    }

    setError(null);
    setSessionPhoneNumber(phone);
    router.push("/attendance/face");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        title="출퇴근 시스템"
        showAdminMenu
        onAdminMenuClick={openAdminModal}
      />

      <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900/80 dark:text-white">
          <h1 className="mb-4 text-2xl font-bold text-textprimary dark:text-white">
            전화번호 입력
          </h1>
          <p className="mb-8 text-sm text-textsecondary dark:text-gray-300">
            출퇴근 인증을 위해 등록된 전화번호를 입력해주세요.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="전화번호"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(event) => handlePhoneChange(event.target.value)}
              error={error ?? undefined}
              inputMode="numeric"
              autoFocus
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="h-14 text-lg font-semibold"
            >
              다음
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
