"use client";

import { useState, useEffect, type RefObject } from "react";

type ScrollDirection = "up" | "down" | null;

export function useScrollDirection<T extends HTMLElement>({
  targetRef,
}: {
  targetRef: RefObject<T>;
}) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const handleScroll = () => {
      const currentScrollTop = element.scrollTop;

      if (currentScrollTop < 10) {
        setVisible(true);
        setScrollDirection(null);
        setPrevScrollTop(currentScrollTop);
        return;
      }

      // Determine scroll direction
      if (currentScrollTop > prevScrollTop) {
        if (scrollDirection !== "down") {
          setScrollDirection("down");
          setVisible(false);
        }
      } else {
        if (scrollDirection !== "up") {
          setScrollDirection("up");
          setVisible(true);
        }
      }

      setPrevScrollTop(currentScrollTop);
    };

    element.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [targetRef, prevScrollTop, scrollDirection]);

  return { scrollDirection, visible };
}
