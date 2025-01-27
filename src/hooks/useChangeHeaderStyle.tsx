import { useEffect, useCallback, useMemo } from "react";
import { useScrollNew } from "./useScrollNew";
import { useSetRecoilState } from "recoil";
import {
  bgColorAtom,
  fontColorAtom,
  isVisibleAtom,
  scrollProgressAtom,
} from "@/atoms/scroll";

export default function useChangeHeaderStyle({
  scrollReady,
}: {
  scrollReady: boolean;
}) {
  const setBgColor = useSetRecoilState(bgColorAtom);
  const setFontColor = useSetRecoilState(fontColorAtom);
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

  const updateColors = useCallback(() => {
    const newBgColor = isPastThreshold ? "#fff" : "transparent";
    const newFontColor = isPastThreshold ? "#0A0A0A" : "#fff";

    setBgColor(newBgColor);
    setFontColor(newFontColor);
  }, [isPastThreshold, setBgColor, setFontColor]);

  useEffect(() => {
    updateScrollState();
  }, [updateScrollState]);

  useEffect(() => {
    updateColors();
  }, [updateColors]);

  // 디버깅을 위한 렌더링 로그 (개발 시에만 사용)
  // useEffect(() => {
  //   console.log('Component rendered');
  // });
}
