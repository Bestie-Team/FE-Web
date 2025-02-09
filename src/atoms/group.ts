import { atom } from "recoil";
import { CreateGroupRequest, UpdateGroupRequest } from "@/models/group";
import { User } from "lighty-type";

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

export const originalGroupMembersAtom = atom<User[] | null>({
  key: "group/selected/members",
  default: [],
});
