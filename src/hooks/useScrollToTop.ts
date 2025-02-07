import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);
}

export function useScrollToTopByTab({ tab = "1" }: { tab: "1" | "2" }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [tab]);
}
