import { useSetRecoilState } from "recoil";
import { headerBgColorAtom, headerFontColorAtom } from "@/atoms/header";
import { useEffect } from "react";
import useScroll from "./useScroll";

export default function useChangeHeaderStyle({
  scrollReady,
}: {
  scrollReady: boolean;
}) {
  // const isPastThreshold = useScrollThreshold(
  //   92,
  //   scrollReady ? "scrollable-container" : undefined
  // );
  const { isPastThreshold } = useScroll(
    scrollReady ? "scrollable-container" : undefined,
    92
  );
  const setBgColor = useSetRecoilState(headerBgColorAtom);
  const setFontColor = useSetRecoilState(headerFontColorAtom);

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
