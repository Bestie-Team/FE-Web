import { atom } from "recoil";
import * as lighty from "lighty-type";
import { GatheringInvitation } from "@/models/gathering";

export const selectedInvitationAtom = atom<GatheringInvitation | null>({
  key: "invitation/selectedInvitation",
  default: null,
});
