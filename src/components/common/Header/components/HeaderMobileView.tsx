import * as React from "react";
import { cn } from "@/utils/cn";
import MenuIcon from "@/components/common/Header/icons/MenuIcon";
import { HeaderDateTime } from "@/components/common/Header/components/HeaderDateTime";
import { HeaderStatus } from "@/components/common/Header/components/HeaderStatus";
import { AdminMenuButton } from "@/components/common/Header/components/AdminMenuButton";

interface HeaderMobileViewProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  date: string;
  time: string;
  networkStatus: "connected" | "disconnected";
  cameraStatus: "normal" | "error";
  networkStatusText: string;
  cameraStatusText: string;
  showAdminMenu: boolean;
  onAdminMenuClick?: () => void;
}

export function HeaderMobileView({
  isMenuOpen,
  onMenuToggle,
  date,
  time,
  networkStatus,
  cameraStatus,
  networkStatusText,
  cameraStatusText,
  showAdminMenu,
  onAdminMenuClick,
}: HeaderMobileViewProps) {
  const handleAdminMenuClick = () => {
    onMenuToggle();
    onAdminMenuClick?.();
  };

  return (
    <>
      <div className="flex md:hidden items-center gap-2">
        <HeaderStatus
          networkStatus={networkStatus}
          cameraStatus={cameraStatus}
          networkStatusText={networkStatusText}
          cameraStatusText={cameraStatusText}
          variant="mobile-compact"
        />
        <button
          onClick={onMenuToggle}
          className={cn(
            "flex items-center justify-center",
            "w-9 h-9 rounded-lg",
            "hover:bg-gray-100",
            "transition-colors"
          )}
          style={{
            color: "var(--color-textprimary)",
          }}
          aria-label="메뉴"
          aria-expanded={isMenuOpen}
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={cn(
            "md:hidden",
            "mt-2 pt-3 pb-2",
            "border-t",
            "flex flex-col gap-3"
          )}
          style={{ borderColor: "var(--border-color)" }}
        >
          <HeaderDateTime date={date} time={time} variant="mobile" />
          <HeaderStatus
            networkStatus={networkStatus}
            cameraStatus={cameraStatus}
            networkStatusText={networkStatusText}
            cameraStatusText={cameraStatusText}
            variant="mobile"
          />
          {showAdminMenu && (
            <AdminMenuButton onClick={handleAdminMenuClick} variant="mobile" />
          )}
        </div>
      )}
    </>
  );
}
