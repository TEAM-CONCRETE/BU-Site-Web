import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "ROLE_EMPLOYEE" | "ROLE_MANAGER" | "ROLE_ADMIN";

export interface AuthState {
  userId: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  setAuth: (userId: string, role: UserRole) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      role: null,
      isAuthenticated: false,
      setAuth: (userId, role) =>
        set({
          userId,
          role,
          isAuthenticated: true,
        }),
      clearAuth: () =>
        set({
          userId: null,
          role: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        userId: state.userId,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
