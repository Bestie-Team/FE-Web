import { GatheringResponse } from "@/models/gathering";

export const GATHERINGS = [
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
      gatheringCount: 0,
    },
    date: "2024-12-25",
    ampm: "오전",
    time: "11시",
    address: "우리 집",
    invitation_img_url:
      "https://d1al3w8x2wydb3.cloudfront.net/images/gathering.png",
  },
] as GatheringResponse[];
