"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useMagneticEffect, useRippleEffect } from "@/hooks/useMagneticEffect";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-[#0047AB] text-white hover:bg-[#0055cc]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-[#1e3a5f] bg-[#0a1628] shadow-xs hover:bg-[#0f2847] hover:text-white hover:border-[#0047AB]/50",
        secondary:
          "bg-[#1e3a5f] text-white hover:bg-[#2a4a6f]",
        ghost:
          "hover:bg-[#1e3a5f] hover:text-white",
        link: "text-[#82C8E5] underline-offset-4 hover:underline",
        // Cobalt Sky premium variants
        glow: "bg-[#0047AB] text-white hover:bg-[#0055cc] animate-glow-pulse shadow-lg shadow-[#0047AB]/30",
        gradient:
          "bg-gradient-to-r from-[#0047AB] via-[#000080] to-[#0047AB] text-white hover:opacity-90 shadow-lg",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-xl px-8 text-base has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  magnetic?: boolean;
  ripple?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  magnetic = false,
  ripple = false,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const { ref: magneticRef, style: magneticStyle } = useMagneticEffect<HTMLButtonElement>({
    strength: 0.2,
    maxDistance: 80,
  });
  const { ripples, createRipple } = useRippleEffect();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      createRipple(e);
    }
    onClick?.(e);
  };

  // For magnetic buttons that aren't asChild
  if (magnetic && !asChild) {
    return (
      <button
        ref={magneticRef}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative overflow-hidden"
        )}
        style={magneticStyle}
        onClick={handleClick}
        {...props}
      >
        {ripple &&
          ripples.map((r) => (
            <span
              key={r.id}
              className="ripple-effect"
              style={{
                left: r.x,
                top: r.y,
                width: 20,
                height: 20,
                marginLeft: -10,
                marginTop: -10,
              }}
            />
          ))}
        {children}
      </button>
    );
  }

  // For ripple-only buttons
  if (ripple && !asChild) {
    return (
      <button
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative overflow-hidden"
        )}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="ripple-effect"
            style={{
              left: r.x,
              top: r.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
            }}
          />
        ))}
        {children}
      </button>
    );
  }

  // Default behavior
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
      {...props}
    >
      {children}
    </Comp>
  );
}

// Magnetic wrapper component for asChild buttons
interface MagneticButtonWrapperProps {
  children: React.ReactNode;
  className?: string;
}

function MagneticButtonWrapper({ children, className }: MagneticButtonWrapperProps) {
  const { ref, style } = useMagneticEffect<HTMLDivElement>({
    strength: 0.25,
    maxDistance: 100,
  });

  return (
    <div ref={ref} style={style} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}

export { Button, buttonVariants, MagneticButtonWrapper };
