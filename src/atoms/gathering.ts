import { GatheringInfo, GatheringType } from "@/models/gathering";
import { GroupInfo, GroupInfoResponse } from "@/models/group";
import { atom } from "recoil";

export const gatheringSelectedTabAtom = atom<"1" | "2">({
  key: "gathering/selectedTab",
  default: "1",
});

export const selectedGatheringTypeAtom = atom<GatheringType>({
  key: "gathering/gatheringType",
  default: "일반 모임",
});

export const gatheringAnimationStatusAtom = atom<boolean>({
  key: "gathering/animationStatus",
  default: false,
});

export const gatheringModalStateAtom = atom<boolean>({
  key: "gathering/modal",
  default: false,
});

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const gatheringSelectedDateAtom = atom<Value>({
  key: "gathering/selectedDate",
  default: new Date(),
});

export const gatheringSelectedAmpmAtom = atom<"오전" | "오후">({
  key: "gathering/selectedAmpm",
  default: "오전",
});

export const gatheringSelectedTimeAtom = atom<string>({
  key: "gathering/selectedTime",
  default: "12:00",
});

export const newGatheringInfo = atom<GatheringInfo>({
  key: "gathering/gatheringInfo",
  default: {
    type: "normal",
    name: "",
    desc: "",
    group: "",
    friends: [],
    date: "",
    ampm: "",
    time: "",
    address: "",
  },
});

export const selectedGroupAtom = atom<GroupInfoResponse>({
  key: "gathering/selectedGroup",
  default: {
    id: "",
    groupName: "",
    imageUrl: "",
    desc: "",
    groupLeader: { imgUrl: "", userId: "", name: "" },
    members: [],
    gatheringCount: 0,
  },
});
