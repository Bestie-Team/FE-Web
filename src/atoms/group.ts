import { atom } from "recoil";
import { CreateGroupRequest, UpdateGroupRequest } from "@/models/group";

export const newGroupAtom = atom<CreateGroupRequest>({
  key: "group/new",
  default: {
    name: "",
    description: "",
    friendIds: null,
    groupImageUrl: "",
  },
});

export const selectedGroupAtom = atom<UpdateGroupRequest>({
  key: "group/selected/info",
  default: {
    groupId: "",
    name: "",
    description: "",
    groupImageUrl: "",
  },
});

export const selectedGroupIdAtom = atom<string>({
  key: "group/selected/id",
  default: "",
});
