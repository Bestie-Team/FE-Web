import { atom, selector } from "recoil";
import { CreateGroupRequest, UpdateGroupRequest } from "@/models/group";
import type { Group, User } from "lighty-type";
import { selectedFriendsAtom } from "@/atoms/friends";

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

export const groupMemberCandidatesSelector = selector<User[]>({
  key: "group/member/candidates",
  get: ({ get }) => {
    const originalMembers = get(originalGroupMembersAtom) ?? [];
    const newMembers = get(selectedFriendsAtom) ?? [];

    const dedupedMembers = new Map<string, User>();

    [...originalMembers, ...newMembers].forEach((member) => {
      dedupedMembers.set(member.id, member);
    });

    return Array.from(dedupedMembers.values());
  },
});
