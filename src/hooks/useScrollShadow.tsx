import { useState, useEffect } from "react";

function useScrollShadow() {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return hasShadow;
}

export default useScrollShadow;
