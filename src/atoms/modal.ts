import { atom } from "recoil";

export const reportModalAtom = atom<boolean>({
  key: "friends/report",
  default: false,
});
