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

// import { useState, useEffect } from "react";

// export default function useScroll(
//   scrollElementId?: string,
//   threshold: number = 10
// ) {
//   const setIsVisible = useSetRecoilState(scrollAtom);
//   const setScrollProgress = useSetRecoilState(scrollProgressAtom);
//   const [isPastThreshold, setIsPastThreshold] = useState(false);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);

//   useEffect(() => {
//     const scrollElement = scrollElementId
//       ? (document.getElementById(scrollElementId) as HTMLElement | null)
//       : window;

//     let lastKnownScrollPosition = 0;
//     let ticking = false;

//     const handleScroll = () => {
//       lastKnownScrollPosition =
//         scrollElement instanceof HTMLElement
//           ? scrollElement.scrollTop
//           : window.scrollY;

//       const maxScrollHeight =
//         scrollElement instanceof HTMLElement
//           ? scrollElement.scrollHeight - scrollElement.clientHeight
//           : document.documentElement.scrollHeight -
//             document.documentElement.clientHeight;

//       // 스크롤 진행도 계산
//       if (maxScrollHeight > 0) {
//         const progress = Math.min(lastKnownScrollPosition / maxScrollHeight, 1);
//         setScrollProgress(progress);
//       }

//       // 스크롤 방향 및 변화량 계산
//       const isScrollingDown = lastKnownScrollPosition > prevScrollPos;
//       const scrollDifference = Math.abs(
//         lastKnownScrollPosition - prevScrollPos
//       );

//       if (scrollDifference > threshold) {
//         setIsVisible(!isScrollingDown);
//         setPrevScrollPos(lastKnownScrollPosition);
//       }

//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           setIsPastThreshold(lastKnownScrollPosition > threshold);
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     scrollElement?.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => {
//       scrollElement?.removeEventListener("scroll", handleScroll);
//     };
//   }, [threshold, scrollElementId, prevScrollPos]);

//   return { isPastThreshold };
// }

// import { useState, useEffect } from "react";
// // import { useSetRecoilState } from "recoil";
// // import { scrollAtom, scrollProgressAtom } from "@/atoms/scroll";

// export default function useScroll(
//   scrollElementId?: string,
//   threshold: number = 10
// ) {
//   const setIsVisible = useSetRecoilState(scrollAtom);
//   const setScrollProgress = useSetRecoilState(scrollProgressAtom);
//   const [isPastThreshold, setIsPastThreshold] = useState(false);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);

//   useEffect(() => {
//     const scrollElement = scrollElementId
//       ? document.getElementById(scrollElementId)
//       : window;

//     if (!scrollElement) return; // scrollElement가 없으면 early return

//     let lastKnownScrollPosition = 0;
//     let ticking = false;

//     const handleScroll = () => {
//       lastKnownScrollPosition =
//         scrollElement instanceof HTMLElement
//           ? scrollElement.scrollTop
//           : window.scrollY;

//       const maxScrollHeight =
//         scrollElement instanceof HTMLElement
//           ? scrollElement.scrollHeight - scrollElement.clientHeight
//           : document.documentElement.scrollHeight -
//             document.documentElement.clientHeight;

//       // 스크롤 진행도 계산
//       if (maxScrollHeight > 0) {
//         const progress = Math.min(lastKnownScrollPosition / maxScrollHeight, 1);
//         setScrollProgress(progress);
//       }

//       // 스크롤 방향 및 변화량 계산
//       const isScrollingDown = lastKnownScrollPosition > prevScrollPos;
//       const scrollDifference = Math.abs(
//         lastKnownScrollPosition - prevScrollPos
//       );

//       if (scrollDifference > threshold) {
//         setIsVisible(!isScrollingDown);
//         setPrevScrollPos(lastKnownScrollPosition);
//       }

//       // 상태 즉시 업데이트
//       setIsPastThreshold(lastKnownScrollPosition > threshold);
//     };

//     // 페이지 로드 시 바로 스크롤 계산
//     handleScroll();

//     // scroll 이벤트 리스너 추가
//     scrollElement.addEventListener("scroll", handleScroll);

//     // 탭 전환 시 스크롤 상태 재계산
//     const handleVisibilityChange = () => {
//       if (!document.hidden) {
//         handleScroll(); // 탭 활성화 시 스크롤 상태 갱신
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     // clean-up
//     return () => {
//       scrollElement.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [threshold, scrollElementId, prevScrollPos]); // 의존성 배열에 prevScrollPos 추가

//   return { isPastThreshold };
// }
import { useState, useEffect, useCallback } from "react";

export default function useScroll(
  scrollElementId?: string,
  threshold: number = 10
) {
  const setIsVisible = useSetRecoilState(scrollAtom);
  const setScrollProgress = useSetRecoilState(scrollProgressAtom);
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const calculateScrollState = useCallback(() => {
    const scrollElement = scrollElementId
      ? document.getElementById(scrollElementId)
      : window;

    if (!scrollElement) return;

    const lastKnownScrollPosition =
      scrollElement instanceof HTMLElement
        ? scrollElement.scrollTop
        : window.scrollY;

    const maxScrollHeight =
      scrollElement instanceof HTMLElement
        ? scrollElement.scrollHeight - scrollElement.clientHeight
        : document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

    // Calculate scroll progress
    if (maxScrollHeight > 0) {
      const progress = Math.min(lastKnownScrollPosition / maxScrollHeight, 1);
      setScrollProgress(progress);
    }

    // Calculate scroll direction and changes
    const isScrollingDown = lastKnownScrollPosition > prevScrollPos;
    const scrollDifference = Math.abs(lastKnownScrollPosition - prevScrollPos);

    if (scrollDifference > threshold) {
      setIsVisible(!isScrollingDown);
      setPrevScrollPos(lastKnownScrollPosition);
    }

    // Update threshold state
    setIsPastThreshold(lastKnownScrollPosition > threshold);
  }, [
    scrollElementId,
    prevScrollPos,
    threshold,
    setIsVisible,
    setScrollProgress,
  ]);

  useEffect(() => {
    const scrollElement = scrollElementId
      ? document.getElementById(scrollElementId)
      : window;

    if (!scrollElement) return;

    // Initial calculation
    calculateScrollState();

    // Scroll event listener
    const handleScroll = () => calculateScrollState();
    scrollElement.addEventListener("scroll", handleScroll);

    // Visibility change handler
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Recalculate scroll state when tab becomes visible
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
  }, [calculateScrollState]);

  return { isPastThreshold };
}
