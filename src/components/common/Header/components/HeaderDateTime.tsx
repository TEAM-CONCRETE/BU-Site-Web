import * as React from "react";
import { cn } from "@/utils/cn";
import CalendarIcon from "@/components/common/Header/icons/CalendarIcon";
import ClockIcon from "@/components/common/Header/icons/ClockIcon";

interface HeaderDateTimeProps {
  date: string;
  time: string;
  variant?: "desktop" | "tablet" | "mobile";
}

export function HeaderDateTime({
  date,
  time,
  variant = "desktop",
}: HeaderDateTimeProps) {
  if (variant === "tablet") {
    return (
      <div
        className={cn("flex items-center gap-1.5", "text-sm leading-6")}
        style={{ color: "var(--color-textsecondary)" }}
      >
        <div className="flex items-center gap-1">
          <CalendarIcon
            className="w-3.5 h-4 shrink-0"
            style={{ color: "var(--color-textsecondary)" }}
          />
          <span className="text-xs whitespace-nowrap">
            {date.split(" ")[0]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon
            className="w-4 h-4 shrink-0"
            style={{ color: "var(--color-textsecondary)" }}
          />
          <span className="text-xs whitespace-nowrap">{time}</span>
        </div>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div
        className={cn("flex flex-col gap-2", "text-sm leading-6")}
        style={{ color: "var(--color-textsecondary)" }}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon
            className="w-4 h-[18px] shrink-0"
            style={{ color: "var(--color-textsecondary)" }}
          />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon
            className="w-[18px] h-[18px] shrink-0"
            style={{ color: "var(--color-textsecondary)" }}
          />
          <span>{time}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-2", "text-base leading-7")}
      style={{ color: "var(--color-textsecondary)" }}
    >
      <div className="flex items-center gap-2">
        <CalendarIcon
          className="w-4 h-[18px] shrink-0"
          style={{ color: "var(--color-textsecondary)" }}
        />
        <span className="whitespace-nowrap">{date}</span>
      </div>
      <div className="flex items-center gap-2">
        <ClockIcon
          className="w-[18px] h-[18px] shrink-0"
          style={{ color: "var(--color-textsecondary)" }}
        />
        <span className="whitespace-nowrap">{time}</span>
      </div>
    </div>
  );
}
