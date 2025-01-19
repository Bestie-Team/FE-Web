import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { locationStatusAtom } from "@/atoms/location";
import NAV_ITEMS from "@/constants/navBarConstants";

export const useActiveNavigation = () => {
  const [activeBtn, setActiveBtn] = useRecoilState(locationStatusAtom);
  const pathname = usePathname();

  const defaultBtn = NAV_ITEMS.findIndex((item) =>
    pathname.startsWith(item.href)
  );

  useEffect(() => {
    setActiveBtn(defaultBtn === -1 ? 0 : defaultBtn);
  }, []);

  return {
    activeBtn,
    setActiveBtn,
    pathname,
  };
};
