import { atom } from "recoil";

export const recordGatheringAtom = atom<string | null>({
  key: "record/gathering",
  default: null,
});

export const recordModalStateAtom = atom<boolean>({
  key: "record/modal",
  default: false,
});
