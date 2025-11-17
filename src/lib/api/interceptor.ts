import { apiClient } from "@/lib/api/client";
import { refreshTokenApi } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { ApiError } from "@/lib/api/errors";

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken(): Promise<void> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const data = await refreshTokenApi();
      useAuthStore.getState().setAuth(data.userId, data.role);
    } catch (error) {
      useAuthStore.getState().clearAuth();
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function authenticatedApiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await apiClient<T>(endpoint, options);
    return response.data;
  } catch (error) {
    if (ApiError.isUnauthorized(error)) {
      try {
        await refreshAccessToken();

        const retryResponse = await apiClient<T>(endpoint, options);
        return retryResponse.data;
      } catch (refreshError) {
        throw refreshError;
      }
    }

    throw error;
  }
}
