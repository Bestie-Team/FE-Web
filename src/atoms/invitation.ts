import { atom } from "recoil";
import * as lighty from "lighty-type";

export const invitationSelectedTabAtom = atom<"1" | "2">({
  key: "invitation/selectedTab",
  default: "1",
});

export const animationStatusAtom = atom<boolean>({
  key: "invitation/animationStatus",
  default: false,
});

export const selectedInvitationAtom = atom<lighty.GatheringInvitation | null>({
  key: "invitation/selectedInvitation",
  default: null,
});
