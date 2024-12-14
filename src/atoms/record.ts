import { atom } from "recoil";

export const recordStepAtom = atom<number | null>({
  key: "record/step",
  default: 1,
});

export const recordGroupAtom = atom<string | null>({
  key: "record/group",
  default: null,
});

export const recordModalStateAtom = atom<boolean>({
  key: "record/modal",
  default: false,
});
