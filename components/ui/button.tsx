import * as React from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonProps["variant"], string> = {
  primary:
    "bg-brand-crimson text-brand-cream hover:bg-brand-burgundy",
  secondary:
    "bg-brand-gold text-brand-navy hover:opacity-90",
  outline:
    "bg-transparent border-2 border-brand-gold text-brand-cream hover:bg-brand-gold/10",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

export function Button({
  variant,
  size = "md",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={twMerge(
        clsx(
          // Base styles
          "inline-flex items-center justify-center gap-2 rounded",
          "font-heading uppercase tracking-wide",
          "transition-colors duration-200",
          // Focus ring for keyboard navigation
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-60",
          // Variant classes
          variantClasses[variant],
          // Size classes
          sizeClasses[size],
          className
        )
      )}
    >
      {isLoading && (
        <Loader2
          className="h-4 w-4 animate-spin shrink-0"
          aria-hidden="true"
        />
      )}
      <span className={clsx(isLoading && "opacity-70")}>{children}</span>
    </button>
  );
}
