import * as lighty from "lighty-type";
import { GroupInfoResponse } from "./group";
import { UserInfo } from "./user";

export interface GatheringResponse {
  id: string;
  type: "group" | "friend";
  name: string;
  description: string;
  friends: UserInfo[];
  group: GroupInfoResponse;
  date: string;
  ampm: string;
  time: string;
  address: string;
  invitationImageUrl: string;
}

export type GatheringType = "friend" | "group";

export interface GatheringInvitation {
  id: string;
  name: string;
  description: string;
  sender: string;
  createdAt: string;
  gatheringDate: string;
  address: string;
  members: lighty.User[];
}

export interface GatheringInvitationListResponse {
  invitations: GatheringInvitation[];
  nextCursor: string | null;
}

export interface CreateGatheringRequest {
  name: string;
  description: string;
  type: "GROUP" | "FRIEND";
  friendIds: null | string[];
  groupId: null | string;
  gatheringDate: string;
  address: string;
  invitationImageUrl: string;
}

export interface GatheringListResponse {
  gatherings: {
    id: string;
    name: string;
    description: string;
    gatheringDate: string;
    invitationImageUrl: string;
  }[];
  nextCursor: string | null;
}

export interface Gathering {
  id: string;
  name: string;
  description: string;
  gatheringDate: string;
  invitationImageUrl: string;
}

export interface GatheringDetailResponse {
  id: string;
  name: string;
  description: string;
  gatheringDate: string;
  address: string;
  invitationImageUrl: string;
  hostUser: lighty.User;
  members: lighty.User[];
}

export type GatheringInWhichType = "GATHERING" | "HOME";
