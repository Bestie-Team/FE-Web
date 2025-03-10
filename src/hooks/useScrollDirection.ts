import { useState, useEffect, type RefObject } from "react";

type ScrollDirection = "up" | "down" | null;

export function useScrollDirection<T extends HTMLElement>({
  elementRef,
  threshold = 144,
}: {
  elementRef: RefObject<T>;
  threshold?: number;
}) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const currentScrollTop = element.scrollTop;

      if (currentScrollTop < threshold) {
        setVisible(true);
        setScrollDirection(null);
        setPrevScrollTop(currentScrollTop);
        return;
      }

      if (currentScrollTop > prevScrollTop) {
        if (scrollDirection !== "down") {
          setScrollDirection("down");
          if (currentScrollTop >= threshold) {
            setVisible(false);
          }
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
  }, [elementRef, prevScrollTop, scrollDirection, threshold]);

  return { scrollDirection, visible };
}
