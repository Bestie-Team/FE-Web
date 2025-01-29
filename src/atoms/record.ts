import { atom } from "recoil";

export const recordGatheringAtom = atom<string | null>({
  key: "record/gathering",
  default: null,
});

export const friendToRecordAtom = atom<string>({
  key: "record/friends/search",
  default: "",
});

export const recordStepAtom = atom<number>({
  key: "record/step",
  default: 1,
});
