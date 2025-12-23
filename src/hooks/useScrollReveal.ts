"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasTriggered(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, isVisible };
}

// Hook for staggered children reveals
export function useStaggeredReveal(
  itemCount: number,
  baseDelay: number = 100,
  options: UseScrollRevealOptions = {}
) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(options);

  const getDelayStyle = useCallback(
    (index: number) => ({
      transitionDelay: isVisible ? `${index * baseDelay}ms` : "0ms",
    }),
    [isVisible, baseDelay]
  );

  return { ref, isVisible, getDelayStyle };
}

// Hook for cascade reveal (center outward)
export function useCascadeReveal(
  itemCount: number,
  baseDelay: number = 100,
  options: UseScrollRevealOptions = {}
) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(options);

  const getCascadeDelayStyle = useCallback(
    (index: number) => {
      // Calculate distance from center
      const center = Math.floor(itemCount / 2);
      const distanceFromCenter = Math.abs(index - center);
      const delay = distanceFromCenter * baseDelay;
      
      return {
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      };
    },
    [isVisible, baseDelay, itemCount]
  );

  return { ref, isVisible, getCascadeDelayStyle };
}

