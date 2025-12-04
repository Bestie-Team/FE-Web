import * as lighty from "lighty-type";
import { atom, selector } from "recoil";

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

export const friendsToShareIdsSelector = selector<string[]>({
  key: "records/friends/ids",
  get: ({ get }) => {
    const friendsToShare = get(friendsToShareAtom);

    if (!friendsToShare || friendsToShare.length === 0) {
      return [];
    }

    return friendsToShare.map((friend) => friend.id);
  },
});
