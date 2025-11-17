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
