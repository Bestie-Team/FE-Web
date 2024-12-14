import { atom, selector } from "recoil";

export const locationStatusAtom = atom<number>({
  key: "locationStatus",
  default: 0,
});
