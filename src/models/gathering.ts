import { FriendInfo } from "./friend";

export interface GatheringInfo {
  type: "normal" | "group";
  name: string;
  desc: string;
  friends: FriendInfo[];
  group: string;
  date: string;
  ampm: string;
  time: string;
  address: string;
}

export type GatheringType = "일반 모임" | "그룹 모임";
