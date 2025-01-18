import { atom } from "recoil";
import * as lighty from "lighty-type";

export const friendsSelectedTabAtom = atom<"1" | "2">({
  key: "friend/selectedTab",
  default: "1",
});

export const selectedFriendsAtom = atom<lighty.User[]>({
  key: "friend/selectedFriends",
  default: [],
});

export const newGroupMembersAtom = atom<lighty.User[]>({
  key: "newGroup/selectedFriends",
  default: [],
});

export const friendsModalStateAtom = atom<boolean>({
  key: "friends/modal",
  default: false,
});

export const friendSearchModalStateAtom = atom<boolean>({
  key: "friends/search/modal",
  default: false,
});

export const userSearchAtom = atom<string>({
  key: "friends/search/users",
  default: "",
});

export const friendSearchAtom = atom<string>({
  key: "friends/search/friends",
  default: "",
});
