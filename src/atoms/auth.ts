import { atom } from "recoil";

export const userInfoAtom = atom<{
  accountId: string;
  profileImageUrl: string | null;
} | null>({
  key: "user/token",
  default: null,
});
