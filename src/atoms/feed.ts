import { atom } from "recoil";

export const commentModalStateAtom = atom<boolean>({
  key: "commentModal",
  default: false,
});

export const feedSelectedTabAtom = atom<"1" | "2">({
  key: "feed/selectedTab",
  default: "1",
});

export const animationStatusAtom = atom<boolean>({
  key: "feed/animationStatus",
  default: false,
});
