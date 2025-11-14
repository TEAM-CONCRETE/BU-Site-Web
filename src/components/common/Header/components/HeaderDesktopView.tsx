import * as React from "react";
import { HeaderDateTime } from "@/components/common/Header/components/HeaderDateTime";
import { HeaderStatus } from "@/components/common/Header/components/HeaderStatus";
import { AdminMenuButton } from "@/components/common/Header/components/AdminMenuButton";

interface HeaderDesktopViewProps {
  date: string;
  time: string;
  networkStatus: "connected" | "disconnected";
  cameraStatus: "normal" | "error";
  networkStatusText: string;
  cameraStatusText: string;
  showAdminMenu: boolean;
  onAdminMenuClick?: () => void;
}

export function HeaderDesktopView({
  date,
  time,
  networkStatus,
  cameraStatus,
  networkStatusText,
  cameraStatusText,
  showAdminMenu,
  onAdminMenuClick,
}: HeaderDesktopViewProps) {
  return (
    <div className="hidden lg:flex items-center gap-4 xl:gap-6">
      <HeaderDateTime date={date} time={time} variant="desktop" />
      <HeaderStatus
        networkStatus={networkStatus}
        cameraStatus={cameraStatus}
        networkStatusText={networkStatusText}
        cameraStatusText={cameraStatusText}
        variant="desktop"
      />
      {showAdminMenu && (
        <AdminMenuButton onClick={onAdminMenuClick} variant="desktop" />
      )}
    </div>
  );
}
