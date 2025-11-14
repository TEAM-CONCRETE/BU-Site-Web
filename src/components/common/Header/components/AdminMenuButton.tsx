import * as React from "react";
import { cn } from "@/utils/cn";
import SettingsIcon from "@/components/common/Header/icons/SettingsIcon";

interface AdminMenuButtonProps {
  onClick?: () => void;
  variant?: "desktop" | "tablet" | "mobile";
}

export function AdminMenuButton({
  onClick,
  variant = "desktop",
}: AdminMenuButtonProps) {
  if (variant === "tablet") {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center justify-center",
          "w-9 h-9 rounded-xl",
          "bg-gray-100 hover:bg-gray-200",
          "transition-colors",
          "text-gray-700"
        )}
        aria-label="관리자 메뉴"
      >
        <SettingsIcon className="w-4 h-4 text-gray-700" />
      </button>
    );
  }

  if (variant === "mobile") {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-2",
          "px-4 py-3 rounded-xl",
          "bg-gray-100 hover:bg-gray-200",
          "transition-colors",
          "text-base leading-5",
          "w-full justify-start",
          "text-gray-700"
        )}
      >
        <SettingsIcon className="w-4 h-4 shrink-0 text-gray-700" />
        <span>관리자 메뉴</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2",
        "px-4 py-3 rounded-xl",
        "bg-gray-100 hover:bg-gray-200",
        "transition-colors",
        "text-base leading-5",
        "text-gray-700"
      )}
    >
      <SettingsIcon className="w-4 h-4 shrink-0 text-gray-700" />
      <span>관리자 메뉴</span>
    </button>
  );
}
