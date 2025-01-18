import { atom } from "recoil";
import * as lighty from "lighty-type";

export const newGroupAtom = atom<lighty.CreateGroupRequest>({
  key: "group/new",
  default: {
    name: "",
    description: "",
    friendIds: [""],
    groupImageUrl: "",
  },
});

export const myGroupAtom = atom<lighty.Group[]>({
  key: "groupList/my",
  default: [],
});

export const groupDeleteAskModalAtom = atom<boolean>({
  key: "group/delete/modal",
  default: false,
});
