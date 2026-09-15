import React from "react";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
}

export function PageContainer({ children, className = "", size = "lg" }: ContainerProps) {
  const maxWidthMap = {
    sm: "max-w-4xl",
    md: "max-w-6xl",
    lg: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthMap[size]} ${className}`}>
      {children}
    </div>
  );
}

export interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  className?: string;
}

export function Grid({ children, columns = 12, className = "" }: GridProps) {
  const colStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
    12: "grid-cols-1 md:grid-cols-12",
  };

  return <div className={`grid gap-6 sm:gap-8 ${colStyles[columns]} ${className}`}>{children}</div>;
}

export interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "dark" | "glass" | "bordered";
}

export function SectionContainer({
  children,
  className = "",
  id,
  background = "default",
}: SectionContainerProps) {
  const bgStyles = {
    default: "",
    dark: "bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl",
    glass: "bg-glass-card border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl",
    bordered: "border-b border-slate-800/80 py-12 sm:py-20",
  };

  return (
    <section id={id} className={`${bgStyles[background]} ${className}`}>
      {children}
    </section>
  );
}
