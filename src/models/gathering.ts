import { MemberInfo } from "@/constants/members";
import { GroupInfoResponse } from "./group";

export interface GatheringInfo {
  type: "normal" | "group";
  name: string;
  desc: string;
  friends: MemberInfo[];
  group: string;
  date: string;
  ampm: string;
  time: string;
  address: string;
  invitation_img_url: string;
}

export interface GatheringResponse {
  id: string;
  type: "normal" | "group";
  name: string;
  desc: string;
  friends: MemberInfo[];
  group: GroupInfoResponse;
  date: string;
  ampm: string;
  time: string;
  address: string;
  invitation_img_url: string;
}

export type GatheringType = "일반 모임" | "그룹 모임";
