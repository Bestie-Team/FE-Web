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

export declare class CreateGroupRequest {
  readonly name: string;
  readonly description: string;
  readonly friendIds: string[] | null;
  readonly groupImageUrl: string;
}
