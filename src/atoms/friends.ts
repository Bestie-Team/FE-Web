import { atom, selector } from "recoil";
import * as lighty from "lighty-type";

export const friendsSelectedTabAtom = atom<"1" | "2">({
  key: "friends/selectedTab",
  default: "1",
});

export const selectedFriendsAtom = atom<lighty.User[] | null>({
  key: "friends/selectedFriends",
  default: null,
});

export const selectedFriendIdsSelector = selector<string[] | null>({
  key: "friends/selectedIds",
  get: ({ get }) => {
    const selectedFriends = get(selectedFriendsAtom);

    if (!selectedFriends || selectedFriends.length === 0) {
      return null;
    }

    return selectedFriends.map((friend) => friend.id);
  },
});

export const userSearchAtom = atom<string>({
  key: "friends/search/users",
  default: "",
});

export const friendSearchAtom = atom<string>({
  key: "friends/search/friends",
  default: "",
});

export const selectedFriendAtom = atom<string>({
  key: "friends/selectedFriend",
  default: "",
});
