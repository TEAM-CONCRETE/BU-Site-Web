"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AttendanceLockState {
  isProgramLocked: boolean;
  isAdminVerified: boolean;
  isAdminModalOpen: boolean;
  hasHydrated: boolean;
  lockProgram: () => void;
  unlockProgram: () => void;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  setAdminVerified: (value: boolean) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAttendanceLockStore = create<AttendanceLockState>()(
  persist(
    (set) => ({
      isProgramLocked: false,
      isAdminVerified: false,
      isAdminModalOpen: false,
      hasHydrated: false,
      lockProgram: () =>
        set({
          isProgramLocked: true,
          isAdminVerified: false,
        }),
      unlockProgram: () =>
        set({
          isProgramLocked: false,
          isAdminVerified: true,
          isAdminModalOpen: false,
        }),
      openAdminModal: () => set({ isAdminModalOpen: true }),
      closeAdminModal: () => set({ isAdminModalOpen: false }),
      setAdminVerified: (value) =>
        set({
          isAdminVerified: value,
          isProgramLocked: value ? false : true,
          isAdminModalOpen: !value,
        }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "attendance-lock",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        isProgramLocked: state.isProgramLocked,
        isAdminVerified: state.isAdminVerified,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
