import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
export const LayoutTransition = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const lastPageRef = useRef<HTMLCollection | null>(null);
  const currentPageRef = useRef<HTMLDivElement>(null);
  const exitAnimationDivRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!currentPageRef.current) return;
    if (!lastPageRef.current)
      lastPageRef.current = currentPageRef.current.children;

    exitAnimationDivRef.current?.appendChild(
      lastPageRef.current![0].cloneNode(true)
    );
    lastPageRef.current = currentPageRef.current.children;
  }, [pathname]);
  if (
    pathname.startsWith("/card") ||
    pathname.startsWith("/new") ||
    pathname.startsWith("/home") ||
    pathname.startsWith("/feed") ||
    pathname.startsWith("/gathering") ||
    pathname.startsWith("/schedule")
  ) {
    return <>{children}</>;
  }
  return (
    <AnimatePresence initial={false}>
      <div>
        <motion.div
          key={pathname + "exit-animation"}
          style={{
            position: "absolute",
          }}
          initial={{ x: 0 }}
          animate={{
            x: "-100%",
            opacity: 1,
          }}
          transition={{
            type: "linear",
            duration: 0.4,
          }}
        >
          <div ref={exitAnimationDivRef} />
        </motion.div>
        <motion.div
          key={pathname}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "linear", duration: 0.4 }}
        >
          <div ref={currentPageRef}>{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
