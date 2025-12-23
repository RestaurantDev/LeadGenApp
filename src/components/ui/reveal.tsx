"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "blur" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
  distance?: number;
}

const directionStyles: Record<RevealDirection, { initial: CSSProperties; visible: CSSProperties }> = {
  up: {
    initial: { opacity: 0, transform: "translateY(30px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  down: {
    initial: { opacity: 0, transform: "translateY(-30px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  left: {
    initial: { opacity: 0, transform: "translateX(30px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  right: {
    initial: { opacity: 0, transform: "translateX(-30px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  scale: {
    initial: { opacity: 0, transform: "scale(0.95)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0)" },
  },
  none: {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  className,
  as: Component = "div",
  threshold = 0.1,
  distance = 30,
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });

  const styles = directionStyles[direction];
  
  // Override distance for directional animations
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return `translateY(${distance}px)`;
        case "down":
          return `translateY(-${distance}px)`;
        case "left":
          return `translateX(${distance}px)`;
        case "right":
          return `translateX(-${distance}px)`;
        case "scale":
          return "scale(0.95)";
        default:
          return "none";
      }
    }
    return direction === "scale" ? "scale(1)" : "translateY(0) translateX(0)";
  };

  const animationStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    filter: direction === "blur" ? (isVisible ? "blur(0)" : "blur(10px)") : undefined,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out, filter ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={animationStyle}
    >
      {children}
    </Component>
  );
}

// Staggered reveal for lists/grids
interface StaggeredRevealProps {
  children: ReactNode[];
  direction?: RevealDirection;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  itemClassName?: string;
  threshold?: number;
}

export function StaggeredReveal({
  children,
  direction = "up",
  staggerDelay = 100,
  duration = 600,
  className,
  itemClassName,
  threshold = 0.1,
}: StaggeredRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => {
        const delay = index * staggerDelay;
        const getTransform = () => {
          if (!isVisible) {
            switch (direction) {
              case "up":
                return "translateY(30px)";
              case "down":
                return "translateY(-30px)";
              case "left":
                return "translateX(30px)";
              case "right":
                return "translateX(-30px)";
              case "scale":
                return "scale(0.95)";
              default:
                return "none";
            }
          }
          return direction === "scale" ? "scale(1)" : "translateY(0) translateX(0)";
        };

        const style: CSSProperties = {
          opacity: isVisible ? 1 : 0,
          transform: getTransform(),
          filter: direction === "blur" ? (isVisible ? "blur(0)" : "blur(10px)") : undefined,
          transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out, filter ${duration}ms ease-out`,
          transitionDelay: isVisible ? `${delay}ms` : "0ms",
        };

        return (
          <div key={index} style={style} className={itemClassName}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

// Cascade reveal (center outward)
interface CascadeRevealProps extends Omit<StaggeredRevealProps, "staggerDelay"> {
  baseDelay?: number;
}

export function CascadeReveal({
  children,
  direction = "scale",
  baseDelay = 100,
  duration = 600,
  className,
  itemClassName,
  threshold = 0.1,
}: CascadeRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });
  const count = children.length;
  const center = Math.floor(count / 2);

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => {
        const distanceFromCenter = Math.abs(index - center);
        const delay = distanceFromCenter * baseDelay;
        
        const getTransform = () => {
          if (!isVisible) {
            switch (direction) {
              case "up":
                return "translateY(30px)";
              case "scale":
                return "scale(0.9)";
              default:
                return "translateY(20px)";
            }
          }
          return direction === "scale" ? "scale(1)" : "translateY(0)";
        };

        const style: CSSProperties = {
          opacity: isVisible ? 1 : 0,
          transform: getTransform(),
          transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
          transitionDelay: isVisible ? `${delay}ms` : "0ms",
        };

        return (
          <div key={index} style={style} className={itemClassName}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

