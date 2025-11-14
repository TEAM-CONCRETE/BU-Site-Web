import * as React from "react";
import { HeaderDateTime } from "@/components/common/Header/components/HeaderDateTime";
import { HeaderStatus } from "@/components/common/Header/components/HeaderStatus";
import { AdminMenuButton } from "@/components/common/Header/components/AdminMenuButton";

interface HeaderTabletViewProps {
  date: string;
  time: string;
  networkStatus: "connected" | "disconnected";
  cameraStatus: "normal" | "error";
  showAdminMenu: boolean;
  onAdminMenuClick?: () => void;
}

export function HeaderTabletView({
  date,
  time,
  networkStatus,
  cameraStatus,
  showAdminMenu,
  onAdminMenuClick,
}: HeaderTabletViewProps) {
  return (
    <div className="hidden md:flex lg:hidden items-center gap-3">
      <HeaderDateTime date={date} time={time} variant="tablet" />
      <HeaderStatus
        networkStatus={networkStatus}
        cameraStatus={cameraStatus}
        networkStatusText=""
        cameraStatusText=""
        variant="tablet"
      />
      {showAdminMenu && (
        <AdminMenuButton onClick={onAdminMenuClick} variant="tablet" />
      )}
    </div>
  );
}
