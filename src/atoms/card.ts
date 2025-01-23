import { GatheringResponse } from "@/models/gathering";
import { atom } from "recoil";

export const cardImageUrlAtom = atom<string>({
  key: "card/imageUrl",
  default: "",
});

export const cardFrameAtom = atom<number>({
  key: "card/frame",
  default: 0,
});

export const cardSelectedGatheringAtom = atom<Partial<GatheringResponse>>({
  key: "card/gathering",
  default: {
    id: "",
    name: "",
    description: "",
    invitationImageUrl: "",
  },
});

export const cardDecorateModalStateAtom = atom<boolean>({
  key: "card/decorate",
  default: false,
});
