import { atom } from "recoil";
import * as lighty from "lighty-type";

export const selectedInvitationAtom = atom<lighty.GatheringInvitation | null>({
  key: "invitation/selectedInvitation",
  default: null,
});
