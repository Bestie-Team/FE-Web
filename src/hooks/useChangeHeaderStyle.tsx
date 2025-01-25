import { useEffect } from "react";
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

  const { isPastThreshold, isVisible, scrollProgress } = useScrollNew(
    scrollReady ? "scrollable-container" : undefined,
    92
  );

  useEffect(() => {
    setScrollProgress(scrollProgress);
    setIsVisible(isVisible);
  }, [isVisible, scrollProgress]);

  useEffect(() => {
    if (isPastThreshold) {
      setBgColor("#fff");
      setFontColor("#0A0A0A");
    } else {
      setBgColor("transparent");
      setFontColor("#fff");
    }
  }, [isPastThreshold, setBgColor, setFontColor]);
}
