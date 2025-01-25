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

    if (!scrollElement) return;

    const handleScroll = () => {
      const currentScrollPos =
        scrollElement instanceof HTMLElement
          ? scrollElement.scrollTop
          : window.scrollY;
      const maxScrollHeight =
        scrollElement instanceof HTMLElement
          ? scrollElement.scrollHeight - scrollElement.clientHeight
          : document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

      // 스크롤 가능한 경우에만 진행도 계산
      if (maxScrollHeight > 0) {
        const progress = Math.min(currentScrollPos / maxScrollHeight, 1);
        setScrollProgress(progress);
      }

      // 스크롤 방향 및 변화량 계산
      const isScrollingDown = currentScrollPos > prevScrollPos;
      const scrollDifference = Math.abs(currentScrollPos - prevScrollPos);

      if (scrollDifference > threshold) {
        setIsVisible(!isScrollingDown);
        setPrevScrollPos(currentScrollPos);
      }
    };

    // 초기 상태에서 네비게이션을 보이게 설정
    setIsVisible(true);

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
