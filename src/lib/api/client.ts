const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  code: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  code: string;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = data || {
        success: false,
        message: "요청 처리 중 오류가 발생했습니다.",
        code: "UNKNOWN_ERROR",
      };

      throw new Error(error.message || "요청 처리 중 오류가 발생했습니다.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("요청 처리 중 오류가 발생했습니다.");
  }
}
