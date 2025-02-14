import * as lighty from "lighty-type";

export type GatheringType = "friend" | "group";

export interface Gathering {
  id: string;
  name: string;
  description: string;
  gatheringDate: string;
  invitationImageUrl: string;
  isFeedPosted?: boolean;
}

export interface FeedGathering {
  id: string;
  name: string;
  members: lighty.User[];
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
