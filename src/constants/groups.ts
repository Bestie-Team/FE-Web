import { GroupInfoResponse } from "@/models/group";

export const GROUPS = [
  {
    id: "0",
    groupName: "다꾸모임💖",
    imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/diary.jpeg",
    desc: "다꾸하는 모임",
    groupLeader: { imgUrl: "", userId: "", name: "" },
    members: [{ imgUrl: "", userId: "", name: "" }],
    gatheringCount: 8,
  },
  {
    id: "1",
    groupName: "클친자",
    imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/climbing.jpeg",
    desc: "클밍 도파민 중독자들",
    groupLeader: { imgUrl: "", userId: "", name: "" },
    members: [{ imgUrl: "", userId: "", name: "" }],
    gatheringCount: 10,
  },
  {
    id: "2",
    groupName: "멍룡모임",
    imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/meongryong.jpg",
    desc: "대왕멍룡이 주인들의 모임",
    groupLeader: { imgUrl: "", userId: "", name: "" },
    members: [{ imgUrl: "", userId: "", name: "" }],
    gatheringCount: 6,
  },
  {
    id: "3",
    groupName: "왕룡꾸모임",
    imageUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cute.jpg",
    desc: "왕룡이 꾸미는 모임",
    groupLeader: { imgUrl: "", userId: "", name: "" },
    members: [{ imgUrl: "", userId: "", name: "" }],
    gatheringCount: 0,
  },
] as GroupInfoResponse[];
