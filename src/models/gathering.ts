import { FriendInfo } from "./friend";

export interface GatheringInfo {
  type: "normal" | "group";
  name: string;
  desc: string;
  friends: FriendInfo[];
  date: string;
  address: string;
}
