import { ApiError } from "@/lib/api/errors";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  code: string;
  data: T;
}

export interface ApiErrorResponse {
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
      credentials: "include",
    });

    let parsedData: unknown;

    try {
      parsedData = await response.json();
    } catch {
      parsedData = {
        success: false,
        message: "응답을 파싱할 수 없습니다.",
        code: "PARSE_ERROR",
      };
    }

    if (!response.ok) {
      const errorResponse: ApiErrorResponse =
        typeof parsedData === "object" &&
        parsedData !== null &&
        "success" in parsedData &&
        parsedData.success === false
          ? (parsedData as ApiErrorResponse)
          : {
              success: false,
              message: "요청 처리 중 오류가 발생했습니다.",
              code: "UNKNOWN_ERROR",
            };

      let errorMessage =
        errorResponse.message || "요청 처리 중 오류가 발생했습니다.";

      if (response.status === 401) {
        errorMessage = errorResponse.message || "인증이 필요합니다.";
      } else if (response.status === 429) {
        errorMessage = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
      } else if (response.status === 500) {
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else if (response.status === 502) {
        errorMessage = "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
      } else if (response.status >= 500) {
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else if (response.status >= 400) {
        errorMessage =
          errorResponse.message || "요청 처리 중 오류가 발생했습니다.";
      }

      throw new ApiError(errorMessage, response.status, errorResponse.code);
    }

    return parsedData as ApiResponse<T>;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("요청 처리 중 오류가 발생했습니다.");
  }
}
