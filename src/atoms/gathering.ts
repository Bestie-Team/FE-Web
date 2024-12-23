import { atom } from "recoil";

export const gatheringSelectedTabAtom = atom<"1" | "2">({
  key: "gathering/selectedTab",
  default: "1",
});
export const gatheringAnimationStatusAtom = atom<boolean>({
  key: "gathering/animationStatus",
  default: false,
});
