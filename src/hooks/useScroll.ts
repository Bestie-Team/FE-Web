import { scrollAtom, scrollProgressAtom } from "@/atoms/scroll";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const useScroll = (
  pathname: string,
  scrollElementId?: string,
  threshold: number = 10
) => {
  const setIsVisible = useSetRecoilState(scrollAtom);
  const setScrollProgress = useSetRecoilState(scrollProgressAtom);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const scrollElement = scrollElementId
      ? (document.getElementById(scrollElementId) as HTMLElement | null)
      : window;

    const handleScroll = () => {
      if (!scrollElement) return;

      const currentScrollPos =
        scrollElement instanceof HTMLElement
          ? scrollElement.scrollTop
          : window.scrollY;

      // 계산된 스크롤 진행도 (0 ~ 1 사이 값)
      const maxScrollHeight =
        scrollElement instanceof HTMLElement
          ? scrollElement.scrollHeight - scrollElement.clientHeight
          : document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

      const progress = Math.min(currentScrollPos / maxScrollHeight, 1);
      setScrollProgress(progress);

      // 스크롤 방향 및 변화량 계산
      const isScrollingDown = currentScrollPos > prevScrollPos;
      const scrollDifference = Math.abs(currentScrollPos - prevScrollPos);

      if (scrollDifference > threshold) {
        setIsVisible(!isScrollingDown);
        setPrevScrollPos(currentScrollPos);
      }
    };

    if (!scrollElement) return;

    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [
    prevScrollPos,
    scrollElementId,
    threshold,
    setIsVisible,
    setScrollProgress,
    pathname,
  ]);
};
