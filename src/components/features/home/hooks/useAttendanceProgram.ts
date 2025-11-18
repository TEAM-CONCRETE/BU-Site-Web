"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAttendanceLockStore } from "@/stores/attendanceLockStore";

export type ProgramStatus = "idle" | "starting";

export function useAttendanceProgram() {
  const router = useRouter();
  const lockProgram = useAttendanceLockStore((state) => state.lockProgram);
  const [status, setStatus] = React.useState<ProgramStatus>("idle");
  const [error, setError] = React.useState<string | null>(null);

  const start = React.useCallback(async () => {
    try {
      setError(null);
      setStatus("starting");
      lockProgram();
      router.push("/attendance/phone");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "출퇴근 프로그램을 시작할 수 없습니다.";
      setError(errorMessage);
      setStatus("idle");
    }
  }, [lockProgram, router]);

  return {
    status,
    error,
    start,
    isStarting: status === "starting",
  };
}
