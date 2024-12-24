"use client";
import { useState, useEffect } from "react";

export default function useScrollThreshold(
  threshold: number,
  scrollElementId?: string
) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    // 스크롤 요소 가져오기: ID가 주어진 경우 해당 요소, 아니면 window
    const scrollElement = scrollElementId
      ? (document.getElementById(scrollElementId) as HTMLElement | null)
      : window;

    const handleScroll = () => {
      const scrollPosition =
        scrollElement instanceof HTMLElement
          ? scrollElement.scrollTop // HTMLElement의 scrollTop
          : window.scrollY; // Window의 scrollY

      setIsPastThreshold(scrollPosition > threshold);
    };

    scrollElement?.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 상태 설정

    return () => {
      scrollElement?.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, scrollElementId]);

  return isPastThreshold;
}
