"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAttendanceLockStore } from "@/stores/attendanceLockStore";

const ALLOWED_PATHS_WHEN_LOCKED = ["/attendance/phone", "/attendance/face"];

export function NavigationLock() {
  const router = useRouter();
  const pathname = usePathname();
  const isProgramLocked = useAttendanceLockStore(
    (state) => state.isProgramLocked
  );
  const isAdminVerified = useAttendanceLockStore(
    (state) => state.isAdminVerified
  );
  const hasHydrated = useAttendanceLockStore((state) => state.hasHydrated);

  React.useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isProgramLocked || isAdminVerified) {
      return;
    }

    if (!ALLOWED_PATHS_WHEN_LOCKED.includes(pathname)) {
      router.replace("/attendance/phone");
    }
  }, [hasHydrated, isAdminVerified, isProgramLocked, pathname, router]);

  React.useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isProgramLocked || isAdminVerified) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasHydrated, isAdminVerified, isProgramLocked]);

  return null;
}
