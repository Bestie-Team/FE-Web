import { atom } from "recoil";
import { GatheringInvitation } from "@/models/gathering";

export const selectedInvitationAtom = atom<GatheringInvitation | null>({
  key: "invitation/selectedInvitation",
  default: null,
});
