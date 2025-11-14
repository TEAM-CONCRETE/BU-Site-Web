import * as React from "react";
import { cn } from "@/utils/cn";
import CameraIcon from "@/components/common/Header/icons/CameraIcon";

interface HeaderStatusProps {
  networkStatus: "connected" | "disconnected";
  cameraStatus: "normal" | "error";
  networkStatusText: string;
  cameraStatusText: string;
  variant?: "desktop" | "tablet" | "mobile" | "mobile-compact";
}

export function HeaderStatus({
  networkStatus,
  cameraStatus,
  networkStatusText,
  cameraStatusText,
  variant = "desktop",
}: HeaderStatusProps) {
  if (variant === "tablet") {
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{
            backgroundColor:
              networkStatus === "connected"
                ? "var(--color-success)"
                : "var(--color-error)",
          }}
        />
        <CameraIcon
          className="w-4 h-4 shrink-0"
          style={{
            color:
              cameraStatus === "normal"
                ? "var(--color-success)"
                : "var(--color-error)",
          }}
        />
      </div>
    );
  }

  if (variant === "mobile-compact") {
    return (
      <div className="flex items-center gap-1.5">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{
            backgroundColor:
              networkStatus === "connected"
                ? "var(--color-success)"
                : "var(--color-error)",
          }}
          aria-label={networkStatusText}
        />
        <CameraIcon
          className="w-4 h-4 shrink-0"
          style={{
            color:
              cameraStatus === "normal"
                ? "var(--color-success)"
                : "var(--color-error)",
          }}
          aria-label={cameraStatusText}
        />
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div
        className={cn("flex flex-col gap-2", "text-sm leading-5")}
        style={{ color: "var(--color-textsecondary)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{
              backgroundColor:
                networkStatus === "connected"
                  ? "var(--color-success)"
                  : "var(--color-error)",
            }}
          />
          <span>{networkStatusText}</span>
        </div>
        <div className="flex items-center gap-2">
          <CameraIcon
            className="w-[18px] h-[18px] shrink-0"
            style={{
              color:
                cameraStatus === "normal"
                  ? "var(--color-success)"
                  : "var(--color-error)",
            }}
          />
          <span>{cameraStatusText}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-3", "text-sm leading-5")}
      style={{ color: "var(--color-textsecondary)" }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{
            backgroundColor:
              networkStatus === "connected"
                ? "var(--color-success)"
                : "var(--color-error)",
          }}
        />
        <span className="whitespace-nowrap">{networkStatusText}</span>
      </div>
      <div className="flex items-center gap-2">
        <CameraIcon
          className="w-[18px] h-[18px] shrink-0"
          style={{
            color:
              cameraStatus === "normal"
                ? "var(--color-success)"
                : "var(--color-error)",
          }}
        />
        <span className="whitespace-nowrap">{cameraStatusText}</span>
      </div>
    </div>
  );
}
