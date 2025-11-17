export class ApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }

  static isUnauthorized(error: unknown): error is ApiError {
    return error instanceof ApiError && error.status === 401;
  }

  static isTooManyRequests(error: unknown): error is ApiError {
    return error instanceof ApiError && error.status === 429;
  }

  static isServerError(error: unknown): error is ApiError {
    return error instanceof ApiError && error.status >= 500;
  }

  static isBadGateway(error: unknown): error is ApiError {
    return error instanceof ApiError && error.status === 502;
  }
}
