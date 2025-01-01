import { useState, useEffect } from "react";

function useScrollShadow() {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    let lastKnownScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      lastKnownScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setHasShadow(lastKnownScrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return hasShadow;
}

export default useScrollShadow;
