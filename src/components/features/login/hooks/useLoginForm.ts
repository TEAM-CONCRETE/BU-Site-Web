import * as React from "react";

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
  const [errors, setErrors] = React.useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = React.useState(false);

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

      setIsLoading(true);
      try {
        // login api call
        // await loginAPI({ id, password });
      } catch {
        setErrors({
          password: "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [validateForm]
  );

  const reset = React.useCallback(() => {
    setId("");
    setPassword("");
    setErrors({});
    setIsLoading(false);
  }, []);

  return {
    id,
    password,
    errors,
    isLoading,
    handleIdChange,
    handlePasswordChange,
    handleSubmit,
    reset,
  };
}
