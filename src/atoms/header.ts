import { atom } from "recoil";

export const headerBgColorAtom = atom<string>({
  key: "HeaderReturner/bg",
  default: "transparent",
});

export const headerFontColorAtom = atom<string>({
  key: "HeaderReturner/font",
  default: "#0A0A0A",
});
