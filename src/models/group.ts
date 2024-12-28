import { MemberInfo } from "@/constants/members";

export interface GroupInfo {
  groupName: string;
  imageUrl: string;
  desc: string;
  groupLeader: string;
  members: MemberInfo[];
}
