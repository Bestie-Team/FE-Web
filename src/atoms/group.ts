import { GroupInfo } from "@/models/group";
import { atom } from "recoil";

export const newGroupAtom = atom<GroupInfo>({
  key: "group/new",
  default: {
    name: "",
    groupImageUrl: "",
    description: "",
    groupLeaderId: "",
    friendIds: [""],
  },
});
