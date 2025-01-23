import { atom } from "recoil";

export const scrollAtom = atom<boolean>({
  key: "scroll/nav",
  default: true,
});

export const scrollProgressAtom = atom<number>({
  key: "scroll/nav/progress",
  default: 0,
});
