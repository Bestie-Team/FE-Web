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
