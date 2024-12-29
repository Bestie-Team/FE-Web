import { MemberInfo } from "@/constants/members";

// export interface GroupInfo {
//   groupName: string;
//   imageUrl: string;
//   desc: string;
//   groupLeader: MemberInfo;
//   members: MemberInfo[];
//   gatheringCount: number;
// }

export interface GroupInfoResponse {
  id: string;
  groupName: string;
  imageUrl: string;
  desc: string;
  groupLeader: MemberInfo;
  members: MemberInfo[];
  gatheringCount: number;
}

export type GroupInfo = Omit<GroupInfoResponse, "id">;
