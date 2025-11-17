import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getMyInfoApi } from "@/lib/api/auth";

export type UserRole = "ROLE_EMPLOYEE" | "ROLE_MANAGER" | "ROLE_ADMIN";

export interface AuthState {
  userId: string | null;
  role: UserRole | null;
  hasSession: boolean;
  setAuth: (userId: string, role: UserRole) => void;
  clearAuth: () => void;
  validateAuth: () => Promise<void>;
  isInitialized: boolean;
  setInitialized: (value: boolean) => void;
}

export const useIsAuthenticated = () => {
  const userId = useAuthStore((state) => state.userId);
  return userId !== null;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      role: null,
      hasSession: false,
      isInitialized: false,
      setAuth: (userId, role) =>
        set({
          userId,
          role,
          hasSession: true,
        }),
      clearAuth: () =>
        set({
          userId: null,
          role: null,
          hasSession: false,
        }),
      validateAuth: async () => {
        if (!get().hasSession) {
          set({ isInitialized: true });
          return;
        }

        try {
          const data = await getMyInfoApi();
          set({
            userId: data.userId,
            role: data.role,
            hasSession: true,
            isInitialized: true,
          });
        } catch {
          set({
            userId: null,
            role: null,
            hasSession: false,
            isInitialized: true,
          });
        }
      },
      setInitialized: (value) => set({ isInitialized: value }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        hasSession: state.hasSession,
      }),
    }
  )
);
