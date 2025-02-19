import { atom } from "recoil";
import { ReceivedGatheringInvitation } from "@/models/gathering";

export const selectedInvitationAtom = atom<ReceivedGatheringInvitation | null>({
  key: "invitation/selectedInvitation",
  default: null,
});
