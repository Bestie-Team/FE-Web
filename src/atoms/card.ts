import { Sticker } from "@/app/card/new/page";
import { atom } from "recoil";

export const cardImageUrlAtom = atom<string>({
  key: "card/ImageUrl",
  default: "",
});

export const stickersAtom = atom<Sticker[]>({
  key: "card/stickers",
  default: [],
});
