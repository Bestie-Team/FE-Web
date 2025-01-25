import useScrollThreshold from "./useScrollThreshold";
import { useSetRecoilState } from "recoil";
import { headerBgColorAtom, headerFontColorAtom } from "@/atoms/header";
import { useEffect } from "react";

export default function useChangeHeaderStyle({
  scrollReady,
}: {
  scrollReady: boolean;
}) {
  const isPastThreshold = useScrollThreshold(
    92,
    scrollReady ? "scrollable-container" : undefined
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
