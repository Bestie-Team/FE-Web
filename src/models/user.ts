export interface UserDetail {
  id: string;
  accountId: string;
  name: string;
  profileImageUrl: string | null;
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

// export declare class SearchUserResponse {
//   users: SearchedUser[];
//   nextCursor: UserCursor | null;
// }
export interface KakaoAuthResponse {
  access_token: string;
  token_type: "bearer";
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}
