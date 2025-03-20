import { ModalType, ReportModalType } from "@/models/modal";
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

export const reportModalAtom = atom<{
  type: ReportModalType | null;
  isOpen: boolean;
}>({
  key: "modal/report",
  default: {
    type: null,
    isOpen: false,
  },
});
