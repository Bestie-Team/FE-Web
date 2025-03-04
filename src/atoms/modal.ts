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

export const friendReportModalAtom = atom<boolean>({
  key: "modal/friendReport",
  default: false,
});

export const feedHideModalAtom = atom<boolean>({
  key: "modal/feedHide",
  default: false,
});

export const feedDisplayModalAtom = atom<boolean>({
  key: "modal/feedDisplay",
  default: false,
});

export const recordModalAtom = atom<boolean>({
  key: "modal/record",
  default: false,
});

export const groupDeleteModalAtom = atom<boolean>({
  key: "modal/groupDelete",
  default: false,
});

export const groupExitModalAtom = atom<boolean>({
  key: "modal/groupExit",
  default: false,
});

export const gatheringDeleteModalAtom = atom<boolean>({
  key: "modal/gatheringDelete",
  default: false,
});

export const reportModalAtom = atom<boolean>({
  key: "report",
  default: false,
});
