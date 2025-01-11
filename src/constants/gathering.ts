import { GatheringResponse } from "@/models/gathering";
import { GroupInfoResponse } from "@/models/group";
import { UserInfo } from "@/models/user";
import { differenceInDays } from "date-fns";

export const GATHERINGS = [
  {
    id: "3",
    type: "friend",
    name: "4차 멍룡꾸 모임",
    description: "멍룡이 꾸미기 4회차",
    friends: [
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
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://cdn.lighty.today/cute.jpg",
      description: "왕룡이 꾸미는 모임",
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
      gatheringCount: 4,
    } as GroupInfoResponse,
    date: "2025-01-12",
    ampm: "오전",
    time: "11시",
    address: "우리 집",
    invitation_img_url: "https://cdn.lighty.today/gathering.png",
  },
  {
    id: "2",
    type: "friend",
    name: "3차 멍룡꾸 모임",
    description: "멍룡이 꾸미기 3회차",
    friends: [
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
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://cdn.lighty.today/cute.jpg",
      description: "왕룡이 꾸미는 모임",
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
      gatheringCount: 3,
    } as GroupInfoResponse,
    date: "2025-01-05",
    ampm: "오후",
    time: "1시",
    address: "카페",
    invitation_img_url: "https://cdn.lighty.today/four_cut.jpeg",
  },
  {
    id: "1",
    type: "friend",
    name: "2차 멍룡꾸 모임",
    description: "멍룡이 꾸미기 2회차",
    friends: [
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
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://cdn.lighty.today/cute.jpg",
      description: "왕룡이 꾸미는 모임",
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
      gatheringCount: 2,
    } as GroupInfoResponse,
    date: "2024-12-12",
    ampm: "오전",
    time: "10시",
    address: "서초",
    invitation_img_url: "https://cdn.lighty.today/name_cake.jpeg",
  },
  {
    id: "0",
    type: "friend",
    name: "1차 멍룡꾸 모임",
    description: "멍룡이 꾸미기 1회차",
    friends: [
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
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://cdn.lighty.today/cute.jpg",
      description: "왕룡이 꾸미는 모임",
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
      gatheringCount: 1,
    } as GroupInfoResponse,
    date: "2024-12-24",
    ampm: "오후",
    time: "6시",
    address: "성수",
    invitation_img_url: "https://cdn.lighty.today/meongryong_wine.jpg",
  },
] as GatheringResponse[];

export const GATHERINGS_PASSED = [
  {
    id: "1",
    type: "friend",
    name: "2차 멍룡꾸 모임",
    description: "멍룡이 꾸미기 2회차",
    friends: [
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
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://cdn.lighty.today/cute.jpg",
      description: "왕룡이 꾸미는 모임",
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
      ],
      gatheringCount: 2,
    } as GroupInfoResponse,
    date: "2024-12-12",
    ampm: "오전",
    time: "10시",
    address: "서초",
    invitation_img_url: "https://cdn.lighty.today/binanton_jp.jpeg",
  },
  {
    id: "0",
    type: "friend",
    name: "1차 멍룡꾸 모임",
    description: "멍룡이 꾸미기 1회차",
    friends: [
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
    group: {
      id: "3",
      groupName: "왕룡꾸모임",
      imageUrl: "https://cdn.lighty.today/cute.jpg",
      description: "왕룡이 꾸미는 모임",
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
      ],
      gatheringCount: 1,
    } as GroupInfoResponse,
    date: "2024-12-24",
    ampm: "오후",
    time: "6시",
    address: "성수",
    invitation_img_url: "https://cdn.lighty.today/groom.JPG",
  },
] as GatheringResponse[];

export const divide = () => {
  const now = new Date();
  return GATHERINGS.reduce(
    (acc, gathering) => {
      const isPassed = differenceInDays(now, gathering.date) >= 0;
      if (isPassed) acc.passed.push(gathering);
      else acc.expecting.push(gathering);
      return acc;
    },
    { expecting: [], passed: [] } as {
      expecting: typeof GATHERINGS;
      passed: typeof GATHERINGS;
    }
  );
};
