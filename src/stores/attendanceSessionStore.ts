"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AttendanceSessionState {
  phoneNumber: string | null;
  hasHydrated: boolean;
  setPhoneNumber: (value: string) => void;
  clearPhoneNumber: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAttendanceSessionStore = create<AttendanceSessionState>()(
  persist(
    (set) => ({
      phoneNumber: null,
      hasHydrated: false,
      setPhoneNumber: (value) => set({ phoneNumber: value }),
      clearPhoneNumber: () => set({ phoneNumber: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "attendance-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        phoneNumber: state.phoneNumber,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
