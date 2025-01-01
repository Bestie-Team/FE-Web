export interface UserDetail {
  id: string;
  accountId: string;
  name: string;
  profileImageUrl: string;
  email: string;
  provider: "KAKAO" | "GOOGLE" | "APPLE";
  groupCount: number;
  feedCount: number;
  friendCount: number;
}

export type UserInfo = Pick<
  UserDetail,
  "accountId" | "name" | "profileImageUrl"
>;
