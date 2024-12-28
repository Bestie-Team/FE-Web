import { FriendInfo } from "@/models/friend";
import { atom } from "recoil";

export const friendsSelectedTabAtom = atom<"1" | "2">({
  key: "friend/selectedTab",
  default: "1",
});

export const selectedFriendsAtom = atom<FriendInfo[]>({
  key: "friend/selectedFriends",
  default: [],
});
