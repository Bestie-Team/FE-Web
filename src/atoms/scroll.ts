import { atom } from "recoil";

export const scrollAtom = atom<boolean>({
  key: "scroll/nav",
  default: true,
});

export const scrollProgressAtom = atom<number>({
  key: "scroll/nav/progress",
  default: 0,
});

export const isVisibleAtom = atom<boolean>({
  key: "scroll/isVisible",
  default: true,
});

export const fontColorAtom = atom<string>({
  key: "fontColor",
  default: "#0A0A0A",
});

export const bgColorAtom = atom<string>({
  key: "bgColor",
  default: "transparent",
});
