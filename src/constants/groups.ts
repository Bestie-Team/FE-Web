import { GroupInfoResponse } from "@/models/group";
import { UserInfo } from "@/models/user";

export const GROUPS = [
  {
    id: "0",
    groupName: "다꾸모임💖",
    imageUrl: "https://cdn.lighty.today/diary.jpeg",
    desc: "다꾸하는 모임",
    groupLeader: {
      profileImageUrl: "https://cdn.lighty.today/cute.jpg",
      accountId: "choco",
      name: "김초코",
    },
    members: [
      {
        profileImageUrl: "https://cdn.lighty.today/yellow.jpg",
        accountId: "sky",
        name: "김하늘",
      },
      {
        profileImageUrl: "https://cdn.lighty.today/mich.jpg",
        accountId: "summer",
        name: "김여름",
      },
      {
        profileImageUrl: "https://cdn.lighty.today/cute.jpg",
        accountId: "choco",
        name: "김초코",
      },
      {
        profileImageUrl: "https://cdn.lighty.today/blanket.jpg",
        accountId: "anton",
        name: "이앤톤",
      },
      {
        profileImageUrl: "https://cdn.lighty.today/cat.jpg",
        accountId: "stone",
        name: "돌",
      },
    ] as UserInfo[],
    gatheringCount: 8,
  },
  {
    id: "1",
    groupName: "클친자",
    imageUrl: "https://cdn.lighty.today/climbing.jpeg",
    desc: "클밍 도파민 중독자들",
    groupLeader: {
      profileImageUrl: "https://cdn.lighty.today/yellow.jpg",
      accountId: "sky",
      name: "김하늘",
    },
    members: [
      {
        profileImageUrl: "https://cdn.lighty.today/yellow.jpg",
        accountId: "sky",
        name: "김하늘",
      },
      {
        profileImageUrl: "https://cdn.lighty.today/mich.jpg",
        accountId: "summer",
        name: "김여름",
      },
    ] as UserInfo[],
    gatheringCount: 10,
  },
  {
    id: "2",
    groupName: "멍룡모임",
    imageUrl: "https://cdn.lighty.today/meongryong.jpeg",
    desc: "대왕멍룡이 주인들의 모임",
    groupLeader: {
      profileImageUrl: "https://cdn.lighty.today/blanket.jpg",
      accountId: "anton",
      name: "이앤톤",
    },
    members: [
      {
        profileImageUrl: "https://cdn.lighty.today/cute.jpg",
        accountId: "choco",
        name: "김초코",
      },
      {
        profileImageUrl: "https://cdn.lighty.today/blanket.jpg",
        accountId: "anton",
        name: "이앤톤",
      },
      {
        profileImageUrl: "https://cdn.lighty.today/cat.jpg",
        accountId: "stone",
        name: "돌",
      },
    ] as UserInfo[],
    gatheringCount: 6,
  },
  {
    id: "3",
    groupName: "왕룡꾸모임",
    imageUrl: "https://cdn.lighty.today/cute.jpg",
    desc: "왕룡이 꾸미는 모임",
    groupLeader: {
      profileImageUrl: "https://cdn.lighty.today/cat.jpg",
      accountId: "stone",
      name: "돌",
    },
    members: [
      {
        profileImageUrl: "https://cdn.lighty.today/cat.jpg",
        accountId: "stone",
        name: "돌",
      },
      {
        profileImageUrl: "https://cdn.lighty.today/yellow.jpg",
        accountId: "sky",
        name: "김하늘",
      },
    ] as UserInfo[],
    gatheringCount: 0,
  },
] as GroupInfoResponse[];
