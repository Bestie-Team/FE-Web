import { GroupInfoResponse } from "@/models/group";

export const GROUPS = [
  {
    id: "0",
    groupName: "다꾸모임💖",
    imageUrl: "https://cdn.lighty.today/diary.jpeg",
    desc: "다꾸하는 모임",
    groupLeader: {
      imageUrl: "https://cdn.lighty.today/cute.jpg",
      userId: "choco",
      name: "김초코",
    },
    members: [
      {
        imageUrl: "https://cdn.lighty.today/yellow.jpg",
        userId: "sky",
        name: "김하늘",
      },
      {
        imageUrl: "https://cdn.lighty.today/mich.jpg",
        userId: "summer",
        name: "김여름",
      },
      {
        imageUrl: "https://cdn.lighty.today/cute.jpg",
        userId: "choco",
        name: "김초코",
      },
      {
        imageUrl: "https://cdn.lighty.today/blanket.jpg",
        userId: "anton",
        name: "이앤톤",
      },
      {
        imageUrl: "https://cdn.lighty.today/cat.jpg",
        userId: "stone",
        name: "돌",
      },
    ],
    gatheringCount: 8,
  },
  {
    id: "1",
    groupName: "클친자",
    imageUrl: "https://cdn.lighty.today/climbing.jpeg",
    desc: "클밍 도파민 중독자들",
    groupLeader: {
      imageUrl: "https://cdn.lighty.today/yellow.jpg",
      userId: "sky",
      name: "김하늘",
    },
    members: [
      {
        imageUrl: "https://cdn.lighty.today/yellow.jpg",
        userId: "sky",
        name: "김하늘",
      },
      {
        imageUrl: "https://cdn.lighty.today/mich.jpg",
        userId: "summer",
        name: "김여름",
      },
    ],
    gatheringCount: 10,
  },
  {
    id: "2",
    groupName: "멍룡모임",
    imageUrl: "https://cdn.lighty.today/meongryong.jpeg",
    desc: "대왕멍룡이 주인들의 모임",
    groupLeader: {
      imageUrl: "https://cdn.lighty.today/blanket.jpg",
      userId: "anton",
      name: "이앤톤",
    },
    members: [
      {
        imageUrl: "https://cdn.lighty.today/cute.jpg",
        userId: "choco",
        name: "김초코",
      },
      {
        imageUrl: "https://cdn.lighty.today/blanket.jpg",
        userId: "anton",
        name: "이앤톤",
      },
      {
        imageUrl: "https://cdn.lighty.today/cat.jpg",
        userId: "stone",
        name: "돌",
      },
    ],
    gatheringCount: 6,
  },
  {
    id: "3",
    groupName: "왕룡꾸모임",
    imageUrl: "https://cdn.lighty.today/cute.jpg",
    desc: "왕룡이 꾸미는 모임",
    groupLeader: {
      imageUrl: "https://cdn.lighty.today/cat.jpg",
      userId: "stone",
      name: "돌",
    },
    members: [
      {
        imageUrl: "https://cdn.lighty.today/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      {
        imageUrl: "https://cdn.lighty.today/yellow.jpg",
        userId: "sky",
        name: "김하늘",
      },
    ],
    gatheringCount: 0,
  },
] as GroupInfoResponse[];
