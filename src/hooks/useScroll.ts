import { scrollAtom, scrollProgressAtom } from "@/atoms/scroll";
import { useSetRecoilState } from "recoil";

// export const useScroll = (
//   pathname: string,
//   scrollElementId?: string,
//   threshold: number = 10
// ) => {
//   const setIsVisible = useSetRecoilState(scrollAtom);
//   const setScrollProgress = useSetRecoilState(scrollProgressAtom);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);

//   useEffect(() => {
//     const scrollElement = scrollElementId
//       ? (document.getElementById(scrollElementId) as HTMLElement | null)
//       : window;

//     if (!scrollElement) return;

//     const handleScroll = () => {
//       const currentScrollPos =
//         scrollElement instanceof HTMLElement
//           ? scrollElement.scrollTop
//           : window.scrollY;
//       const maxScrollHeight =
//         scrollElement instanceof HTMLElement
//           ? scrollElement.scrollHeight - scrollElement.clientHeight
//           : document.documentElement.scrollHeight -
//             document.documentElement.clientHeight;

//       // 스크롤 가능한 경우에만 진행도 계산
//       if (maxScrollHeight > 0) {
//         const progress = Math.min(currentScrollPos / maxScrollHeight, 1);
//         setScrollProgress(progress);
//       }

//       // 스크롤 방향 및 변화량 계산
//       const isScrollingDown = currentScrollPos > prevScrollPos;
//       const scrollDifference = Math.abs(currentScrollPos - prevScrollPos);

//       if (scrollDifference > threshold) {
//         setIsVisible(!isScrollingDown);
//         setPrevScrollPos((prev) => currentScrollPos);
//       }
//     };

//     // 초기 상태에서 네비게이션을 보이게 설정
//     setIsVisible(true);

//     if (!scrollElement) return;

//     scrollElement.addEventListener("scroll", handleScroll, { passive: true });
//     return () => scrollElement.removeEventListener("scroll", handleScroll);
//   }, [
//     prevScrollPos,
//     scrollElementId,
//     threshold,
//     setIsVisible,
//     setScrollProgress,
//     pathname,
//   ]);
// };

import { useState, useEffect } from "react";

export default function useScroll(
  scrollElementId?: string,
  threshold: number = 10
) {
  const setIsVisible = useSetRecoilState(scrollAtom);
  const setScrollProgress = useSetRecoilState(scrollProgressAtom);
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const scrollElement = scrollElementId
      ? (document.getElementById(scrollElementId) as HTMLElement | null)
      : window;

    let lastKnownScrollPosition = 0;
    let ticking = false;

    const handleScroll = () => {
      lastKnownScrollPosition =
        scrollElement instanceof HTMLElement
          ? scrollElement.scrollTop
          : window.scrollY;

      const maxScrollHeight =
        scrollElement instanceof HTMLElement
          ? scrollElement.scrollHeight - scrollElement.clientHeight
          : document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

      // 스크롤 진행도 계산
      if (maxScrollHeight > 0) {
        const progress = Math.min(lastKnownScrollPosition / maxScrollHeight, 1);
        setScrollProgress(progress);
      }

      // 스크롤 방향 및 변화량 계산
      const isScrollingDown = lastKnownScrollPosition > prevScrollPos;
      const scrollDifference = Math.abs(
        lastKnownScrollPosition - prevScrollPos
      );

      if (scrollDifference > threshold) {
        setIsVisible(!isScrollingDown);
        setPrevScrollPos(lastKnownScrollPosition);
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsPastThreshold(lastKnownScrollPosition > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    scrollElement?.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scrollElement?.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, scrollElementId, prevScrollPos]);

  return { isPastThreshold };
}
