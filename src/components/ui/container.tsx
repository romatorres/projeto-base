"use client";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("w-full px-4 md:px-8 py-4 md:py-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface ContainerTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  buttonLabel?: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export function ContainerTitle({
  children,
  className,
  buttonLabel,
  ...props
}: ContainerTitleProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
      <h3
        className={cn("text-lg md:text-xl font-semibold", className)}
        {...props}
      >
        {children}
      </h3>
      {buttonLabel && (
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          {...props.buttonProps}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
