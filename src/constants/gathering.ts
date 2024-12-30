import { GatheringResponse } from "@/models/gathering";

export const GATHERINGS = [
  {
    id: "3",
    type: "normal",
    name: "4회 모임",
    desc: "멍룡이 꾸미기 4회차",
    friends: [
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
        userId: "sky",
        name: "김하늘",
      },
    ],
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cute.jpg",
      desc: "왕룡이 꾸미는 모임",
      groupLeader: {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      members: [
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
          userId: "stone",
          name: "돌",
        },
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
          userId: "sky",
          name: "김하늘",
        },
      ],
      gatheringCount: 4,
    },
    date: "2025-01-12",
    ampm: "오전",
    time: "11시",
    address: "우리 집",
    invitation_img_url:
      "https://d1al3w8x2wydb3.cloudfront.net/images/gathering.png",
  },
  {
    id: "2",
    type: "normal",
    name: "3회 모임",
    desc: "멍룡이 꾸미기 3회차",
    friends: [
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
        userId: "sky",
        name: "김하늘",
      },
    ],
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cute.jpg",
      desc: "왕룡이 꾸미는 모임",
      groupLeader: {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      members: [
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
          userId: "stone",
          name: "돌",
        },
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
          userId: "sky",
          name: "김하늘",
        },
      ],
      gatheringCount: 3,
    },
    date: "2025-01-05",
    ampm: "오후",
    time: "1시",
    address: "카페",
    invitation_img_url:
      "https://d1al3w8x2wydb3.cloudfront.net/images/four_cut.jpeg",
  },
  {
    id: "1",
    type: "normal",
    name: "2회 모임",
    desc: "멍룡이 꾸미기 2회차",
    friends: [
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
        userId: "sky",
        name: "김하늘",
      },
    ],
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cute.jpg",
      desc: "왕룡이 꾸미는 모임",
      groupLeader: {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      members: [
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
          userId: "stone",
          name: "돌",
        },
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
          userId: "sky",
          name: "김하늘",
        },
      ],
      gatheringCount: 2,
    },
    date: "2024-12-12",
    ampm: "오전",
    time: "10시",
    address: "서초",
    invitation_img_url:
      "https://d1al3w8x2wydb3.cloudfront.net/images/name_cake.jpeg",
  },
  {
    id: "0",
    type: "normal",
    name: "1회 모임",
    desc: "멍룡이 꾸미기 1회차",
    friends: [
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
        userId: "sky",
        name: "김하늘",
      },
    ],
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cute.jpg",
      desc: "왕룡이 꾸미는 모임",
      groupLeader: {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      members: [
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
          userId: "stone",
          name: "돌",
        },
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
          userId: "sky",
          name: "김하늘",
        },
      ],
      gatheringCount: 1,
    },
    date: "2024-12-24",
    ampm: "오후",
    time: "6시",
    address: "성수",
    invitation_img_url:
      "https://d1al3w8x2wydb3.cloudfront.net/images/meongryong_wine.jpeg",
  },
] as GatheringResponse[];

export const GATHERINGS_PASSED = [
  {
    id: "1",
    type: "normal",
    name: "2회 모임",
    desc: "멍룡이 꾸미기 2회차",
    friends: [
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
        userId: "sky",
        name: "김하늘",
      },
    ],
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cute.jpg",
      desc: "왕룡이 꾸미는 모임",
      groupLeader: {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      members: [
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
          userId: "stone",
          name: "돌",
        },
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
          userId: "sky",
          name: "김하늘",
        },
      ],
      gatheringCount: 2,
    },
    date: "2024-12-12",
    ampm: "오전",
    time: "10시",
    address: "서초",
    invitation_img_url:
      "https://d1al3w8x2wydb3.cloudfront.net/images/name_cake.jpeg",
  },
  {
    id: "0",
    type: "normal",
    name: "1회 모임",
    desc: "멍룡이 꾸미기 1회차",
    friends: [
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
        userId: "sky",
        name: "김하늘",
      },
    ],
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cute.jpg",
      desc: "왕룡이 꾸미는 모임",
      groupLeader: {
        imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
        userId: "stone",
        name: "돌",
      },
      members: [
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
          userId: "stone",
          name: "돌",
        },
        {
          imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
          userId: "sky",
          name: "김하늘",
        },
      ],
      gatheringCount: 1,
    },
    date: "2024-12-24",
    ampm: "오후",
    time: "6시",
    address: "성수",
    invitation_img_url:
      "https://d1al3w8x2wydb3.cloudfront.net/images/meongryong_wine.jpeg",
  },
] as GatheringResponse[];