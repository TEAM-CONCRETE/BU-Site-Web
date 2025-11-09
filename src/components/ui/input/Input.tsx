import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      size = "md",
      fullWidth = false,
      disabled,
      readOnly,
      type = "text",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText && !error ? `${inputId}-helper` : undefined;

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-12 px-4 text-base",
      lg: "h-14 px-5 text-lg",
    };

    const baseStyles =
      "w-full border rounded-lg transition-all focus:outline-none focus:border-2";

    const stateStyles = error
      ? "border-error text-textprimary focus:border-error focus:border-2"
      : readOnly
        ? "bg-gray-50 border-gray-200 text-textprimary cursor-default"
        : disabled
          ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
          : "border-gray-300 text-textprimary focus:border-primary";

    return (
      <div className={cn("flex flex-col", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 text-sm font-medium text-textprimary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId || helperId}
          className={cn(
            baseStyles,
            sizeStyles[size],
            stateStyles,
            disabled && "opacity-50",
            className
          )}
          {...props}
        />
        {error && (
          <span id={errorId} className="mt-1 text-sm text-error" role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={helperId} className="mt-1 text-sm text-textmuted">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
