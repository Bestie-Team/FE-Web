import { ModalType } from "@/models/modal";
import { atom } from "recoil";

export const modalStateAtom = atom<{ type: ModalType | null; isOpen: boolean }>(
  {
    key: "modal",
    default: {
      type: null,
      isOpen: false,
    },
  }
);

export const friendReportModalAtom = atom<boolean>({
  key: "modal/friendReport",
  default: false,
});

export const recordModalAtom = atom<boolean>({
  key: "modal/record",
  default: false,
});

export const reportModalAtom = atom<boolean>({
  key: "report",
  default: false,
});
