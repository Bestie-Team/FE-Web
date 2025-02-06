import { useEffect, useCallback, useMemo } from "react";
import { useScrollNew } from "./useScrollNew";
import { useSetRecoilState } from "recoil";
import { isVisibleAtom, scrollProgressAtom } from "@/atoms/scroll";

export default function useChangeHeaderStyle({
  scrollReady,
}: {
  scrollReady: boolean;
}) {
  const setIsVisible = useSetRecoilState(isVisibleAtom);
  const setScrollProgress = useSetRecoilState(scrollProgressAtom);

  const scrollContainer = useMemo(
    () => (scrollReady ? "scrollable-container" : undefined),
    [scrollReady]
  );

  const { isPastThreshold, isVisible, scrollProgress } = useScrollNew(
    scrollContainer,
    92
  );

  const updateScrollState = useCallback(() => {
    setScrollProgress(scrollProgress);
    setIsVisible(isVisible);
  }, [isVisible, scrollProgress, setScrollProgress, setIsVisible]);

  useEffect(() => {
    updateScrollState();
  }, [updateScrollState]);
}
