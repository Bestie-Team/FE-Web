import { atom } from "recoil";
import { CreateGroupRequest } from "@/models/group";

export const newGroupAtom = atom<CreateGroupRequest>({
  key: "group/new",
  default: {
    name: "",
    description: "",
    friendIds: null,
    groupImageUrl: "",
  },
});

export const selectedGroupAtom = atom<CreateGroupRequest>({
  key: "group/selected/info",
  default: {
    name: "",
    description: "",
    friendIds: null,
    groupImageUrl: "",
  },
});

export const selectedGroupIdAtom = atom<string>({
  key: "group/selected/id",
  default: "",
});
