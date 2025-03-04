import { atom } from "recoil";
import { CreateGroupRequest, UpdateGroupRequest } from "@/models/group";
import { Group, User } from "lighty-type";

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

export const selectedGroupDetailAtom = atom<Group>({
  key: "group/selected/detail",
  default: {
    id: "",
    name: "",
    description: "",
    gatheringCount: 0,
    groupImageUrl: "",
    joinDate: "",
    owner: {
      id: "",
      accountId: "",
      name: "",
      profileImageUrl: null,
    },
    members: [
      {
        id: "",
        accountId: "",
        name: "",
        profileImageUrl: null,
      },
    ],
  },
});

export const originalGroupMembersAtom = atom<User[] | null>({
  key: "group/selected/members",
  default: [],
});
