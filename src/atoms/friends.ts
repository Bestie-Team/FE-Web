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
