import { apiClient } from "@/lib/api/client";

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
  role: "ROLE_EMPLOYEE" | "ROLE_MANAGER" | "ROLE_ADMIN";
  expiresIn: number;
}

export async function loginApi(request: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient<LoginResponse>("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
    credentials: "include",
  });

  return response.data;
}

export interface TokenRefreshResponse {
  accessToken: string;
  userId: string;
  role: "ROLE_EMPLOYEE" | "ROLE_MANAGER" | "ROLE_ADMIN";
  expiresIn: number;
}

export async function refreshTokenApi(): Promise<TokenRefreshResponse> {
  const response = await apiClient<TokenRefreshResponse>(
    "/v1/auth/token/refresh",
    {
      method: "POST",
      credentials: "include",
    }
  );

  return response.data;
}
