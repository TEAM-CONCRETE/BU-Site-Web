import * as React from "react";
import { useLogin } from "@/components/features/login/hooks/useLogin";

export interface LoginFormData {
  id: string;
  password: string;
}

export interface LoginFormErrors {
  id?: string;
  password?: string;
}

export function useLoginForm() {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errors, setErrors] = React.useState<LoginFormErrors>({});
  const loginMutation = useLogin();

  const validateForm = React.useCallback((): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!id.trim()) {
      newErrors.id = "아이디를 입력해주세요";
    }

    if (!password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [id, password]);

  const handleIdChange = React.useCallback(
    (value: string) => {
      setId(value);
      if (errors.id) {
        setErrors((prev) => ({ ...prev, id: undefined }));
      }
    },
    [errors.id]
  );

  const handlePasswordChange = React.useCallback(
    (value: string) => {
      setPassword(value);
      if (errors.password) {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    },
    [errors.password]
  );

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        await loginMutation.mutateAsync({
          username: id,
          password,
          rememberMe,
        });
      } catch (error) {
        setErrors({
          password: getFriendlyErrorMessage(error),
        });
      }
    },
    [validateForm, id, password, rememberMe, loginMutation]
  );

  const reset = React.useCallback(() => {
    setId("");
    setPassword("");
    setRememberMe(false);
    setErrors({});
  }, []);

  return {
    id,
    password,
    rememberMe,
    errors,
    isLoading: loginMutation.isPending,
    handleIdChange,
    handlePasswordChange,
    setRememberMe,
    handleSubmit,
    reset,
  };
}

function getFriendlyErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (
      error.message === "Failed to fetch" ||
      error.message.toLowerCase().includes("network")
    ) {
      return "서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
    }

    return error.message;
  }

  return "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
}
