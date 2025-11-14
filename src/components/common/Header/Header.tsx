"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import { useHeaderState } from "@/components/common/Header/hooks/useHeaderState";
import { HeaderDesktopView } from "@/components/common/Header/components/HeaderDesktopView";
import { HeaderTabletView } from "@/components/common/Header/components/HeaderTabletView";
import { HeaderMobileView } from "@/components/common/Header/components/HeaderMobileView";

export interface HeaderProps {
  title?: string;
  showAdminMenu?: boolean;
  onAdminMenuClick?: () => void;
  className?: string;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      title = "Build-Up 현장 출입 시스템",
      showAdminMenu = false,
      onAdminMenuClick,
      className,
    },
    ref
  ) => {
    const {
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      currentDate,
      currentTime,
      networkStatus,
      cameraStatus,
      networkStatusText,
      cameraStatusText,
    } = useHeaderState();

    return (
      <header
        ref={ref}
        className={cn(
          "w-full border-b",
          "px-3 sm:px-4 md:px-6",
          "min-h-[65px] flex items-center",
          className
        )}
        style={{
          backgroundColor: "var(--header-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="w-full">
          <div
            className={cn(
              "w-full flex items-center justify-between gap-2",
              "md:gap-4"
            )}
          >
            <h1
              className={cn(
                "text-base sm:text-lg md:text-xl lg:text-2xl",
                "font-bold leading-tight",
                "truncate flex-1 min-w-0"
              )}
              style={{ color: "var(--color-textprimary)" }}
            >
              {title}
            </h1>

            <HeaderDesktopView
              date={currentDate}
              time={currentTime}
              networkStatus={networkStatus}
              cameraStatus={cameraStatus}
              networkStatusText={networkStatusText}
              cameraStatusText={cameraStatusText}
              showAdminMenu={showAdminMenu}
              onAdminMenuClick={onAdminMenuClick}
            />

            <HeaderTabletView
              date={currentDate}
              time={currentTime}
              networkStatus={networkStatus}
              cameraStatus={cameraStatus}
              showAdminMenu={showAdminMenu}
              onAdminMenuClick={onAdminMenuClick}
            />

            <HeaderMobileView
              isMenuOpen={isMobileMenuOpen}
              onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              date={currentDate}
              time={currentTime}
              networkStatus={networkStatus}
              cameraStatus={cameraStatus}
              networkStatusText={networkStatusText}
              cameraStatusText={cameraStatusText}
              showAdminMenu={showAdminMenu}
              onAdminMenuClick={onAdminMenuClick}
            />
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

export default Header;
