"use client";

import * as React from "react";
import { Button } from "@/components/ui";
import { useAttendanceProgram } from "@/components/features/home/hooks/useAttendanceProgram";
import { useLogout } from "@/components/features/home/hooks/useLogout";
import { cn } from "@/utils/cn";

export function HomeActionButtons() {
  const { start, isStarting, error } = useAttendanceProgram();
  const { logout, isLoading: isLoggingOut } = useLogout();

  const handleStartClick = React.useCallback(async () => {
    await start();
  }, [start]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="primary"
        size="lg"
        onClick={handleStartClick}
        disabled={isStarting}
        isLoading={isStarting}
        className={cn("h-[52px] rounded-xl text-2xl font-semibold")}
      >
        출퇴근 프로그램 시작
      </Button>
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}

      <Button
        variant="ghost"
        size="lg"
        onClick={logout}
        disabled={isLoggingOut}
        isLoading={isLoggingOut}
        className={cn(
          "h-[52px] rounded-xl",
          "text-2xl font-semibold",
          "bg-black/70 text-white",
          "hover:bg-black/80"
        )}
      >
        로그아웃
      </Button>
    </div>
  );
}
