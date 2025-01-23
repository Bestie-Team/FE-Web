import { atom } from "recoil";

export const commentDeleteModalAtom = atom<boolean>({
  key: "modal/commentDelete",
  default: false,
});

export const feedDeleteModalAtom = atom<boolean>({
  key: "modal/feedDelete",
  default: false,
});

export const friendDeleteModalAtom = atom<boolean>({
  key: "modal/friendDelete",
  default: false,
});

export const feedHideModalAtom = atom<boolean>({
  key: "modal/feedHide",
  default: false,
});

export const recordModalAtom = atom<boolean>({
  key: "modal/record",
  default: false,
});
