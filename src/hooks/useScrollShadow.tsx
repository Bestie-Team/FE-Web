import { useEffect, useState } from "react";

function useScrollShadow(elementRef?: React.RefObject<HTMLElement>) {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const element = elementRef?.current;
    if (!element) return;

    let lastKnownScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      lastKnownScrollY = element.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setHasShadow(lastKnownScrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    element.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef]);

  return hasShadow;
}

export default useScrollShadow;
