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
  invitation_img_url: string;
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
  invitation_img_url: string;
}

export type GatheringType = "friend" | "group";
