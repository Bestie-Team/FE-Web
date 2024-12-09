import { atom } from "recoil";

export const headerBgColorAtom = atom<string>({
  key: "header/bg",
  default: "transparent",
});

export const headerFontColorAtom = atom<string>({
  key: "header/font",
  default: "#0A0A0A",
});
