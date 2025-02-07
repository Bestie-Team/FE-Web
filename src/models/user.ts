import { User, UserCursor } from "lighty-type";

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

type NewUser = User & { status: string };
export declare class SearchFriendResponse {
  readonly users: NewUser[];
  readonly nextCursor: UserCursor | null;
}
