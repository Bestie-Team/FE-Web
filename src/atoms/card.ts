import { atom } from "recoil";

export const cardImageUrlAtom = atom<string>({
  key: "card/ImageUrl",
  default: "",
});
