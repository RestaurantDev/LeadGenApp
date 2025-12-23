"use client";

import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  animated?: boolean;
}

// Custom Radar/Logo Icon - Animated concentric rings
export function RadarIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 2"
        className={animated ? "animate-spin-slow" : ""}
        style={{ transformOrigin: "center" }}
      />
      {/* Middle ring */}
      <circle
        cx="12"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Inner dot */}
      <circle
        cx="12"
        cy="12"
        r="2.5"
        fill="currentColor"
        className={animated ? "animate-pulse-dot" : ""}
      />
      {/* Sweep line */}
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={animated ? "animate-radar-sweep" : ""}
        style={{ transformOrigin: "12px 12px" }}
      />
    </svg>
  );
}

// Custom Lightning Bolt - Geometric, sharp edges
export function LightningIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6", className, animated && "animate-flash")}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="bevel"
      />
    </svg>
  );
}

// Custom Stars Cluster - 3 stars with different sizes
export function StarsIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Large star */}
      <path
        d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"
        fill="currentColor"
        className={animated ? "animate-twinkle" : ""}
      />
      {/* Small star top right */}
      <path
        d="M19 4l0.5 1.5L21 6l-1.5 0.5L19 8l-0.5-1.5L17 6l1.5-0.5L19 4z"
        fill="currentColor"
        opacity="0.8"
        className={animated ? "animate-twinkle-delay-1" : ""}
      />
      {/* Small star bottom */}
      <path
        d="M8 16l0.75 2.25L11 19l-2.25 0.75L8 22l-0.75-2.25L5 19l2.25-0.75L8 16z"
        fill="currentColor"
        opacity="0.6"
        className={animated ? "animate-twinkle-delay-2" : ""}
      />
    </svg>
  );
}

// Custom Crown - Minimal line-art style
export function CrownIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6", className, animated && "animate-float")}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crown shape */}
      <path
        d="M3 18L5 8l4 4 3-6 3 6 4-4 2 10H3z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Gems */}
      <circle cx="7" cy="14" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" opacity="0.5" />
      <circle cx="17" cy="14" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// Custom Checkmark - Rounded, organic stroke
export function CheckIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12.5l5.5 5.5L20 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "animate-draw-check" : ""}
        style={{
          strokeDasharray: animated ? "24" : "none",
          strokeDashoffset: animated ? "24" : "0",
        }}
      />
    </svg>
  );
}

// Custom Arrow Right - Animated on hover
export function ArrowIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6 transition-transform", className, animated && "group-hover:translate-x-1")}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="origin-left transition-all group-hover:scale-x-110"
      />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Custom Send/Rocket Icon - For "You Close" step
export function SendIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6", className, animated && "animate-send-pulse")}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22l-4-9-9-4 20-7z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Custom Target/Scope Icon - For scraping/tracking
export function TargetIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        className={animated ? "animate-pulse" : ""}
      />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Crosshairs */}
      <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Custom Lock Icon - For premium/locked content
export function LockIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6", className, animated && "animate-shake")}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="11"
        width="16"
        height="10"
        rx="2"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M7 11V7a5 5 0 0110 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Custom Clock/Timer Icon - For refresh rate
export function TimerIcon({ className, animated = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-6 h-6", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="13"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Clock hands */}
      <line
        x1="12"
        y1="13"
        x2="12"
        y2="7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={animated ? "animate-tick origin-bottom" : ""}
        style={{ transformOrigin: "12px 13px" }}
      />
      <line
        x1="12"
        y1="13"
        x2="16"
        y2="13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Top button */}
      <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="5" x2="20" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

