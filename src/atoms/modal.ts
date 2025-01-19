import { atom } from "recoil";

export const reportModalAtom = atom<boolean>({
  key: "friends/report",
  default: false,
});

export const commentDeleteAskModalAtom = atom<boolean>({
  key: "comment/delete",
  default: false,
});
