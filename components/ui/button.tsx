"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "purple";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-purple-deep font-semibold hover:bg-gold-hover shadow-md shadow-gold/20",
  purple:
    "gradient-purple-gold text-white font-semibold shadow-md shadow-purple/25 hover:brightness-110",
  secondary:
    "bg-purple-surface text-foreground border border-card-border hover:border-purple-light/50",
  ghost: "text-foreground hover:bg-purple-muted/60",
  outline:
    "border border-gold/60 text-gold hover:bg-gold-muted hover:border-gold",
};

const base =
  "box-border inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-center text-sm font-medium leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-light disabled:pointer-events-none disabled:opacity-50 sm:text-base";

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
};

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = BaseProps & { href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", className, children, fullWidth, type = "button", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variants[variant], fullWidth && "w-full", className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
  fullWidth,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        base,
        variants[variant],
        fullWidth ? "flex w-full" : "inline-flex w-full sm:w-auto",
        className,
      )}
    >
      {children}
    </Link>
  );
}
