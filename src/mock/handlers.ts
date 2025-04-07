import { http, HttpResponse } from "msw";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const handlers = [
  http.get(
    `${backendUrl}/feeds?order=DESC&minDate=2024-12-31T15:00:00.000Z&maxDate=2025-12-31T15:00:00.000Z&cursor=%7B%22createdAt%22%3A%222025-12-31T15%3A00%3A00.000Z%22%2C%22id%22%3A%22494cd60f-b0e8-47f6-a427-94dd7c342665%22%7D&limit=8`,
    () => {
      return HttpResponse.json({
        feeds: [
          {
            id: "c3f79d5e-5425-422a-bbd2-be953e4b9f86",
            commentCount: 4,
            content: "스폰지밥 전시회 다녀옴",
            createdAt: "2025-03-29T12:45:30.364Z",
            writer: {
              id: "9ce6291c-c1fe-4706-94ea-cb8d18b45aba",
              accountId: "kkiri12",
              name: "코끼리",
              profileImageUrl:
                "https://cdn.lighty.today/user/profile/5458ace1-b391-4fd6-8924-b243d16951e9.png",
            },
            gathering: null,
            images: [
              "https://cdn.lighty.today/feed/image/94c033ef-7574-47b9-9feb-f580f0e33489.blob",
              "https://cdn.lighty.today/feed/image/2e5cdfe5-7443-4414-8e6a-d51832113b76.blob",
            ],
            withMembers: [
              {
                id: "5028aa07-23f5-4b1b-8abd-7bbeef06d894",
                accountId: "abcde",
                name: "최은재",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/9af2e834-e8d9-48bd-93e6-08e05b77b2c1.jpeg",
              },
              {
                id: "ffe131f5-c9f9-4e2a-8feb-7d4392b07354",
                accountId: "saysay1",
                name: "홍수연",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/05551dfe-0830-41ab-949c-5cd495b9e0a5.jpeg",
              },
            ],
          },
          {
            id: "97919cdc-6307-4a54-9f88-692ad95e30b7",
            commentCount: 1,
            content: "리본둘기",
            createdAt: "2025-03-28T20:08:17.148Z",
            writer: {
              id: "9ce6291c-c1fe-4706-94ea-cb8d18b45aba",
              accountId: "kkiri12",
              name: "코끼리",
              profileImageUrl:
                "https://cdn.lighty.today/user/profile/5458ace1-b391-4fd6-8924-b243d16951e9.png",
            },
            gathering: null,
            images: [
              "https://cdn.lighty.today/feed/image/7c9b4548-91f0-4c67-a9b3-74ebc12f07c6.blob",
            ],
            withMembers: [
              {
                id: "5028aa07-23f5-4b1b-8abd-7bbeef06d894",
                accountId: "abcde",
                name: "최은재",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/9af2e834-e8d9-48bd-93e6-08e05b77b2c1.jpeg",
              },
              {
                id: "ffe131f5-c9f9-4e2a-8feb-7d4392b07354",
                accountId: "saysay1",
                name: "홍수연",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/05551dfe-0830-41ab-949c-5cd495b9e0a5.jpeg",
              },
            ],
          },
          {
            id: "971b05d6-1c2f-4ebe-bae2-be8ce2acc534",
            commentCount: 0,
            content: "새똥 맞은 비둘기",
            createdAt: "2025-03-28T20:06:25.369Z",
            writer: {
              id: "9ce6291c-c1fe-4706-94ea-cb8d18b45aba",
              accountId: "kkiri12",
              name: "코끼리",
              profileImageUrl:
                "https://cdn.lighty.today/user/profile/5458ace1-b391-4fd6-8924-b243d16951e9.png",
            },
            gathering: null,
            images: [
              "https://cdn.lighty.today/feed/image/5a2f147f-2c60-4960-b6d3-923f46922d46.blob",
            ],
            withMembers: [
              {
                id: "5028aa07-23f5-4b1b-8abd-7bbeef06d894",
                accountId: "abcde",
                name: "최은재",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/9af2e834-e8d9-48bd-93e6-08e05b77b2c1.jpeg",
              },
              {
                id: "ffe131f5-c9f9-4e2a-8feb-7d4392b07354",
                accountId: "saysay1",
                name: "홍수연",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/05551dfe-0830-41ab-949c-5cd495b9e0a5.jpeg",
              },
            ],
          },
          {
            id: "d3263f30-37da-4146-bee5-a2b50a242358",
            commentCount: 0,
            content: "링크 이벤트 버블링……..",
            createdAt: "2025-03-27T14:45:18.452Z",
            writer: {
              id: "5028aa07-23f5-4b1b-8abd-7bbeef06d894",
              accountId: "abcde",
              name: "최은재",
              profileImageUrl:
                "https://cdn.lighty.today/user/profile/9af2e834-e8d9-48bd-93e6-08e05b77b2c1.jpeg",
            },
            gathering: null,
            images: [
              "https://cdn.lighty.today/feed/image/267941c7-dcd8-451d-9c5a-0adab2447148.blob",
            ],
            withMembers: [],
          },
          {
            id: "e9e1e1f2-3620-4615-8c76-dffb7b7fb3f8",
            commentCount: 1,
            content: "asdfasdfadf",
            createdAt: "2025-03-25T17:18:40.846Z",
            writer: {
              id: "5028aa07-23f5-4b1b-8abd-7bbeef06d894",
              accountId: "abcde",
              name: "최은재",
              profileImageUrl:
                "https://cdn.lighty.today/user/profile/9af2e834-e8d9-48bd-93e6-08e05b77b2c1.jpeg",
            },
            gathering: null,
            images: [
              "https://cdn.lighty.today/feed/image/15975801-17c2-4f3e-b4ee-908f32323fd4.blob",
            ],
            withMembers: [
              {
                id: "9ce6291c-c1fe-4706-94ea-cb8d18b45aba",
                accountId: "kkiri12",
                name: "코끼리",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/5458ace1-b391-4fd6-8924-b243d16951e9.png",
              },
            ],
          },
          {
            id: "aa3d5f53-8198-41fc-b91d-1f2e0a54de83",
            commentCount: 2,
            content: "Jsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjsjs",
            createdAt: "2025-03-25T11:24:22.706Z",
            writer: {
              id: "5028aa07-23f5-4b1b-8abd-7bbeef06d894",
              accountId: "abcde",
              name: "최은재",
              profileImageUrl:
                "https://cdn.lighty.today/user/profile/9af2e834-e8d9-48bd-93e6-08e05b77b2c1.jpeg",
            },
            gathering: null,
            images: [
              "https://cdn.lighty.today/feed/image/b8187c78-c3d4-4fdc-a0fc-a9fc7909c96f.blob",
            ],
            withMembers: [
              {
                id: "ffe131f5-c9f9-4e2a-8feb-7d4392b07354",
                accountId: "saysay1",
                name: "홍수연",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/05551dfe-0830-41ab-949c-5cd495b9e0a5.jpeg",
              },
              {
                id: "9ce6291c-c1fe-4706-94ea-cb8d18b45aba",
                accountId: "kkiri12",
                name: "코끼리",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/5458ace1-b391-4fd6-8924-b243d16951e9.png",
              },
              {
                id: "1cf6b3f4-bd75-44ea-90da-01dc84609674",
                accountId: "apple_",
                name: "Eunjae",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/d052d83e-a205-4c91-af12-9fd5b7de4137.png",
              },
            ],
          },
          {
            id: "e3b0d6c2-c093-4f3d-ba86-4047f7d9358e",
            commentCount: 0,
            content: "ㅌㅅㅌ",
            createdAt: "2025-03-23T07:32:37.681Z",
            writer: {
              id: "ffe131f5-c9f9-4e2a-8feb-7d4392b07354",
              accountId: "saysay1",
              name: "홍수연",
              profileImageUrl:
                "https://cdn.lighty.today/user/profile/05551dfe-0830-41ab-949c-5cd495b9e0a5.jpeg",
            },
            gathering: null,
            images: [
              "https://cdn.lighty.today/feed/image/d3ee26e9-1557-4ddc-bcdb-62ceadc9eace.blob",
            ],
            withMembers: [
              {
                id: "5028aa07-23f5-4b1b-8abd-7bbeef06d894",
                accountId: "abcde",
                name: "최은재",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/9af2e834-e8d9-48bd-93e6-08e05b77b2c1.jpeg",
              },
              {
                id: "9ce6291c-c1fe-4706-94ea-cb8d18b45aba",
                accountId: "kkiri12",
                name: "코끼리",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/5458ace1-b391-4fd6-8924-b243d16951e9.png",
              },
            ],
          },
          {
            id: "57aabd21-fd89-4e9b-938b-a377cb21c3ee",
            commentCount: 0,
            content: "안녕하세요",
            createdAt: "2025-03-21T08:33:02.494Z",
            writer: {
              id: "ffe131f5-c9f9-4e2a-8feb-7d4392b07354",
              accountId: "saysay1",
              name: "홍수연",
              profileImageUrl:
                "https://cdn.lighty.today/user/profile/05551dfe-0830-41ab-949c-5cd495b9e0a5.jpeg",
            },
            gathering: null,
            images: [
              "https://cdn.lighty.today/feed/image/82a9eb27-9f75-4cab-9573-5b70c4ded6bc.blob",
            ],
            withMembers: [
              {
                id: "5028aa07-23f5-4b1b-8abd-7bbeef06d894",
                accountId: "abcde",
                name: "최은재",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/9af2e834-e8d9-48bd-93e6-08e05b77b2c1.jpeg",
              },
              {
                id: "9ce6291c-c1fe-4706-94ea-cb8d18b45aba",
                accountId: "kkiri12",
                name: "코끼리",
                profileImageUrl:
                  "https://cdn.lighty.today/user/profile/5458ace1-b391-4fd6-8924-b243d16951e9.png",
              },
            ],
          },
        ],
        nextCursor: {
          createdAt: "2025-03-21T08:33:02.494Z",
          id: "57aabd21-fd89-4e9b-938b-a377cb21c3ee",
        },
      });
    }
  ),
];
