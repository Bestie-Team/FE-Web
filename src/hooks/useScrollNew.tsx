import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollState {
  isVisible: boolean;
  scrollProgress: number;
  isPastThreshold: boolean;
}

export function useScrollNew(
  scrollElementId?: string,
  threshold = 10
): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isVisible: true,
    scrollProgress: 0,
    isPastThreshold: false,
  });
  console.log("scrollElementId", scrollElementId);
  const prevScrollPosRef = useRef(0);

  const calculateScrollState = useCallback(() => {
    const scrollElement = scrollElementId
      ? document.getElementById(scrollElementId)
      : document.documentElement;

    if (!scrollElement) return;

    const lastKnownScrollPosition = scrollElement.scrollTop;
    const maxScrollHeight =
      scrollElement.scrollHeight - scrollElement.clientHeight;

    // Calculate scroll progress
    const scrollProgress =
      maxScrollHeight > 0
        ? Math.min(lastKnownScrollPosition / maxScrollHeight, 1)
        : 0;

    // Calculate scroll direction and changes
    const isScrollingDown = lastKnownScrollPosition > prevScrollPosRef.current;
    const scrollDifference = Math.abs(
      lastKnownScrollPosition - prevScrollPosRef.current
    );

    setScrollState((prevState) => ({
      isVisible:
        scrollDifference > threshold ? !isScrollingDown : prevState.isVisible,
      scrollProgress,
      isPastThreshold: lastKnownScrollPosition > threshold,
    }));

    prevScrollPosRef.current = lastKnownScrollPosition;
  }, [scrollElementId, threshold]);

  useEffect(() => {
    const scrollElement = scrollElementId
      ? document.getElementById(scrollElementId)
      : window;

    if (!scrollElement) return;

    // Initial calculation
    calculateScrollState();

    // Scroll event listener
    const handleScroll = () => {
      window.requestAnimationFrame(calculateScrollState);
    };

    scrollElement.addEventListener("scroll", handleScroll, { passive: true });

    // Visibility change handler
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        calculateScrollState();
      }
    };

    // Page visibility and focus events
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", calculateScrollState);

    // Cleanup
    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", calculateScrollState);
    };
  }, [calculateScrollState, scrollElementId]);

  return scrollState;
}
