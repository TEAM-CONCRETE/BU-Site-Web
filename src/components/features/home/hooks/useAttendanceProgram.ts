"use client";

import * as React from "react";

export type ProgramStatus = "idle" | "starting";

export function useAttendanceProgram() {
  const [status, setStatus] = React.useState<ProgramStatus>("idle");
  const [error, setError] = React.useState<string | null>(null);

  const start = React.useCallback(async () => {
    try {
      setError(null);
      setStatus("starting");
      // Todo: 출퇴근 프로그램 시작 페이지로 라우팅
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "출퇴근 프로그램을 시작할 수 없습니다.";
      setError(errorMessage);
      setStatus("idle");
    }
  }, []);

  return {
    status,
    error,
    start,
    isStarting: status === "starting",
  };
}
