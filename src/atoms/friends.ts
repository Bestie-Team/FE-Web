import { UserInfo } from "@/models/user";
import { atom } from "recoil";

export const friendsSelectedTabAtom = atom<"1" | "2">({
  key: "friend/selectedTab",
  default: "1",
});

export const selectedFriendsAtom = atom<UserInfo[]>({
  key: "friend/selectedFriends",
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

export const friendSearchAtom = atom<string>({
  key: "friends/search",
  default: "",
});
