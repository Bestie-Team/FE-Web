import { UserInfo } from "@/models/user";

export interface GroupInfo {
  name: string;
  groupImageUrl: string | null;
  description: string;
  groupLeaderId: string;
  friendIds: string[];
}

export interface GroupInfoResponse {
  id: string;
  groupName: string;
  imageUrl: string;
  desc: string;
  groupLeader: UserInfo;
  members: UserInfo[];
  gatheringCount: number;
}
