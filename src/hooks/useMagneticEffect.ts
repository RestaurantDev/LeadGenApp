"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface MagneticState {
  x: number;
  y: number;
}

interface UseMagneticEffectOptions {
  strength?: number; // How much the element moves (0-1, default 0.3)
  ease?: number; // Easing factor for smooth animation
  maxDistance?: number; // Max distance to trigger effect (in px)
}

export function useMagneticEffect<T extends HTMLElement = HTMLButtonElement>(
  options: UseMagneticEffectOptions = {}
) {
  const { strength = 0.3, ease = 0.15, maxDistance = 100 } = options;
  const ref = useRef<T>(null);
  const [position, setPosition] = useState<MagneticState>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const targetRef = useRef<MagneticState>({ x: 0, y: 0 });
  const currentRef = useRef<MagneticState>({ x: 0, y: 0 });

  const animate = useCallback(() => {
    // Smooth interpolation
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;

    // Only update state if there's meaningful change
    if (
      Math.abs(currentRef.current.x - position.x) > 0.01 ||
      Math.abs(currentRef.current.y - position.y) > 0.01
    ) {
      setPosition({ x: currentRef.current.x, y: currentRef.current.y });
    }

    // Continue animation if not at rest
    if (
      Math.abs(targetRef.current.x - currentRef.current.x) > 0.01 ||
      Math.abs(targetRef.current.y - currentRef.current.y) > 0.01
    ) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [ease, position.x, position.y]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < maxDistance) {
        // Calculate magnetic pull based on distance
        const pull = 1 - distance / maxDistance;
        targetRef.current = {
          x: distanceX * strength * pull,
          y: distanceY * strength * pull,
        };
      } else {
        targetRef.current = { x: 0, y: 0 };
      }

      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    },
    [strength, maxDistance, animate]
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Listen on document to track cursor even when not directly over element
    document.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: "transform 0.1s ease-out",
  };

  return { ref, style, position };
}

// Simplified hook for ripple effect
export function useRippleEffect() {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples((prev) => [...prev, { x, y, id }]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  return { ripples, createRipple };
}

