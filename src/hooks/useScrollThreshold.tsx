// "use client";
// import { useState, useEffect } from "react";

// export default function useScrollThreshold(
//   threshold: number,
//   scrollElementId?: string
// ) {
//   const [isPastThreshold, setIsPastThreshold] = useState(false);

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
//   }, [threshold, scrollElementId]);

//   return isPastThreshold;
// }

import { useState, useEffect } from "react";

export function useScrollThreshold(threshold = 60) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsPastThreshold(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 상태 설정

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isPastThreshold;
}
