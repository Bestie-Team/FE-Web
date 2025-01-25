import useScrollThreshold from "./useScrollThreshold";
import { useSetRecoilState } from "recoil";
import { headerBgColorAtom, headerFontColorAtom } from "@/atoms/header";

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

  if (isPastThreshold) {
    setBgColor("#fff");
    setFontColor("#0A0A0A");
  } else {
    setBgColor("transparent");
    setFontColor("#fff");
  }
}
