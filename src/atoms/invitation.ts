import { atom } from "recoil";

export const invitationSelectedTabAtom = atom<"1" | "2">({
  key: "invitation/selectedTab",
  default: "1",
});

export const animationStatusAtom = atom<boolean>({
  key: "invitation/animationStatus",
  default: false,
});
