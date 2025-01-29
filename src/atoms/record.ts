import { atom } from "recoil";

export const recordGatheringAtom = atom<string | null>({
  key: "record/gathering",
  default: null,
});

export const friendToRecordAtom = atom<string>({
  key: "friends/search/record",
  default: "",
});
