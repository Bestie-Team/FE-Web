import { MemberInfo } from "@/constants/members";
import { atom } from "recoil";

export const friendsSelectedTabAtom = atom<"1" | "2">({
  key: "friend/selectedTab",
  default: "1",
});

export const selectedFriendsAtom = atom<MemberInfo[]>({
  key: "friend/selectedFriends",
  default: [],
});
