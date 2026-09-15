import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare, Loader2 } from "lucide-react";

export interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "phone" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  external?: boolean;
}

export function CTAButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  isLoading = false,
  disabled = false,
  type = "button",
  external = false,
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/80 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl";

  const sizeStyles = {
    sm: "px-4 py-2.5 min-h-[44px]",
    md: "px-6 py-3.5 min-h-[48px]",
    lg: "px-8 py-4 text-sm sm:text-base min-h-[52px]",
  };

  const variantStyles = {
    primary:
      "bg-[#E53935] hover:bg-[#D32F2F] text-white shadow-lg shadow-red-600/20 hover:shadow-red-600/35 border border-red-500/50 hover:scale-[1.01] active:scale-[0.99]",
    secondary:
      "bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-slate-500 hover:text-white shadow-xs",
    tertiary:
      "bg-transparent text-slate-300 hover:text-red-400 p-0 hover:bg-transparent min-h-0 text-xs font-bold tracking-normal normal-case",
    phone:
      "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md border border-amber-400/50 font-extrabold",
    whatsapp:
      "bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md border border-emerald-400/50 font-extrabold",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
      {variant === "phone" && <Phone className="h-4 w-4 mr-2" />}
      {variant === "whatsapp" && <MessageSquare className="h-4 w-4 mr-2" />}
      <span>{children}</span>
      {variant === "primary" && <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />}
      {variant === "tertiary" && <ArrowRight className="h-3.5 w-3.5 ml-1.5" />}
    </>
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("https:")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${combinedStyles}`}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={`group ${combinedStyles}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`group ${combinedStyles}`}
    >
      {content}
    </button>
  );
}
