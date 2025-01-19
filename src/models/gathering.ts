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
export interface GatheringInvitation {
  id: string;
  name: string;
  description: string;
  sender: string;
  createdAt: string;
  gatheringDate: string;
  invitation_image_url: string;
  address: string;
  groupName: string | null;
  members: lighty.User[];
}

export type GatheringInWhichType = "GATHERING" | "HOME";

export const GatheringType = {
  GROUP: "GROUP" as lighty.GatheringType,
  FRIEND: "FRIEND" as lighty.GatheringType,
};

export const GatheringInWhich = {
  GATHERING: "GATHERING" as GatheringInWhichType,
  HOME: "HOME" as GatheringInWhichType,
};
