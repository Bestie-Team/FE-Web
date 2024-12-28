import { FriendInfo } from "./friend";

export interface GatheringInfo {
  type: "normal" | "group";
  name: string;
  desc: string;
  friends: FriendInfo[];
  date: string;
  ampm: string;
  time: string;
  address: string;
}
