import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const variantStyles = {
      primary:
        "bg-primary text-textinverse hover:bg-primary-dark active:bg-primary-dark disabled:bg-gray-300 disabled:text-gray-500",
      secondary:
        "bg-secondary text-textinverse hover:bg-secondary-dark active:bg-secondary-dark disabled:bg-gray-300 disabled:text-gray-500",
      outline:
        "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 disabled:border-gray-300 disabled:text-gray-500",
      ghost:
        "text-primary bg-transparent hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-500",
      danger:
        "bg-error text-textinverse hover:bg-error-dark active:bg-error-dark disabled:bg-gray-300 disabled:text-gray-500",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          "font-medium",
          "rounded-lg",
          "transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>로딩 중...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
