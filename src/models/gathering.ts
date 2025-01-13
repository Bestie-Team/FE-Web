import * as lighty from "lighty-type";
import { GroupInfoResponse } from "./group";
import { UserInfo } from "./user";

export interface GatheringInfo {
  type: "group" | "friend";
  name: string;
  description: string;
  friendIds: string[];
  groupId: string;
  date: string;
  ampm: string;
  time: string;
  address: string;
  invitationImageUrl: string;
}

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
