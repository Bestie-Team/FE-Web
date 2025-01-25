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

export const selectedGroupAtom = atom<lighty.CreateGroupRequest>({
  key: "group/selected/info",
  default: {
    name: "",
    description: "",
    friendIds: [""],
    groupImageUrl: "",
  },
});

export const selectedGroupIdAtom = atom<string>({
  key: "group/selected/id",
  default: "",
});
