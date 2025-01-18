import { UserInfo } from "@/models/user";

export interface GroupInfoResponse {
  id: string;
  groupName: string;
  imageUrl: string;
  description: string;
  groupLeader: UserInfo;
  members: UserInfo[];
  gatheringCount: number;
}
