import { usePathname } from "next/navigation";
import { selector } from "recoil";
import { homeModalStateAtom } from "./home";
import { recordModalStateAtom } from "./record";

export const modalStateSelector = selector({
  key: "modalStateSelector",
  get: () => {
    const pathname = usePathname();
    if (pathname.startsWith("/home")) return homeModalStateAtom;
    return recordModalStateAtom;
  },
});
