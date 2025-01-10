import { StickerType } from "@/components/cards/Decorate";
import { GatheringResponse } from "@/models/gathering";
import { atom } from "recoil";

export const cardImageUrlAtom = atom<string>({
  key: "card/ImageUrl",
  default: "",
});

export const cardImageAtom = atom<HTMLImageElement | null>({
  key: "card/Image",
  default: null,
});

export const cardStepAtom = atom<number>({
  key: "card/step",
  default: 1,
});

export const cardFrameAtom = atom<number>({
  key: "card/frame",
  default: 0,
});

export const stickersAtom = atom<StickerType[]>({
  key: "card/stickers",
  default: [],
});

export const canvasAtom = atom<fabric.Canvas | null>({
  key: "canvasAtom",
  default: null,
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

export const cardDecorateModalStateAtom = atom<boolean>({
  key: "card/decorate",
  default: false,
});

export const silverDecorateStickersAtom = atom<{ [key: number]: boolean }>({
  key: "card/silver_stickers",
  default: {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
  },
});
