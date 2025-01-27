import { Feed } from "@/models/feed";
import { atom } from "recoil";

export const commentModalStateAtom = atom<boolean>({
  key: "feed/commentModal",
  default: false,
});

export const selectedFeedIdAtom = atom<string>({
  key: "feed/selectedId/delete",
  default: "",
});

export const selectedFeedInfoAtom = atom<Feed | null>({
  key: "feed/selectedInfo/edit",
  default: null,
});
