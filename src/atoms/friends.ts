import { atom } from "recoil";

export const friendsSelectedTabAtom = atom<"1" | "2">({
  key: "friend/selectedTab",
  default: "1",
});
