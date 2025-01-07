import { Sticker } from "@/components/cards/Decorate";
import { GatheringResponse } from "@/models/gathering";
import { atom } from "recoil";

export const cardImageUrlAtom = atom<string>({
  key: "card/ImageUrl",
  default: "",
});

export const cardStepAtom = atom<number>({
  key: "card/step",
  default: 1,
});

export const cardFrameAtom = atom<number | null>({
  key: "card/frame",
  default: null,
});

export const stickersAtom = atom<Sticker[]>({
  key: "card/stickers",
  default: [],
});

export const selectedGatheringIdAtom = atom<string | null>({
  key: "card/gatheringId",
  default: null,
});

export const cardSelectedGatheringAtom = atom<Partial<GatheringResponse>>({
  key: "card/gathering",
  default: {
    id: "",
    name: "",
    description: "",
    invitation_img_url: "",
  },
});
