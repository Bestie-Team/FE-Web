import * as lighty from "lighty-type";
import { atom } from "recoil";

export const recordGatheringAtom = atom<string>({
  key: "record/gathering",
  default: "",
});

export const friendToRecordAtom = atom<string>({
  key: "record/friends/search",
  default: "",
});

export const recordStepAtom = atom<number>({
  key: "record/step",
  default: 1,
});

export const friendsToShareAtom = atom<lighty.User[]>({
  key: "records/friends",
  default: [],
});
