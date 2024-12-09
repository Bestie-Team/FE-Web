import { atom } from "recoil";

export const commentModalStateAtom = atom<boolean>({
  key: "commentModal",
  default: false,
});
