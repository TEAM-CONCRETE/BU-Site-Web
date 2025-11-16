"use client";

import * as React from "react";
import { Input, Button } from "@/components/ui";
import { cn } from "@/utils/cn";
import { useLoginForm } from "@/components/features/login/hooks/useLoginForm";

export function LoginForm() {
  const {
    id,
    password,
    errors,
    isLoading,
    handleIdChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="ID"
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={(e) => handleIdChange(e.target.value)}
          error={errors.id}
          className={cn(
            "bg-gray-50 border-gray-200",
            "focus:border-primary focus:bg-background",
            "dark:bg-gray-800 dark:border-gray-700"
          )}
          disabled={isLoading}
        />
      </div>

      <div>
        <Input
          label="PW"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          error={errors.password}
          className={cn(
            "bg-gray-50 border-gray-200",
            "focus:border-primary focus:bg-background",
            "dark:bg-gray-800 dark:border-gray-700"
          )}
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
        className="h-12 rounded-lg"
      >
        확인
      </Button>
    </form>
  );
}
