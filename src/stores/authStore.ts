import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "ROLE_EMPLOYEE" | "ROLE_MANAGER" | "ROLE_ADMIN";

export interface AuthState {
  accessToken: string | null;
  userId: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  setAuth: (token: string, userId: string, role: UserRole) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      role: null,
      isAuthenticated: false,
      setAuth: (token, userId, role) =>
        set({
          accessToken: token,
          userId,
          role,
          isAuthenticated: true,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          userId: null,
          role: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        userId: state.userId,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
