import { useState, useEffect } from "react";
import NAV_ITEMS from "@/constants/navBar";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";
import { NavLink } from "./NavBar/NavLink";
import * as lighty from "lighty-type";
import useUserDetail from "../users/hooks/useUserDetail";
import DotSpinnerSmall from "./Spinner/DotSpinnerSmall";
import STORAGE_KEYS from "@/constants/storageKeys";
import FloatingButton from "./Button/FloatingButton";

const NavBar = () => {
  const { data: user, isFetching } = useUserDetail();
  const [isClient, setIsClient] = useState(false);
  const { activeBtn, setActiveBtn, pathname } = useActiveNavigation();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setIsClient(true);
    const userInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (userInfo) {
      const parsed: lighty.LoginResponse = JSON.parse(userInfo);
      if (parsed.profileImageUrl) {
        setImageUrl(parsed.profileImageUrl);
      }
    }
  }, []);

  if (!isClient) return null;

  const portalRoot = document.getElementById("root-portal");
  if (!portalRoot) return null;

  const showSheetButton =
    ["/feed"].some((path) => pathname.startsWith(path)) ||
    pathname.endsWith("/gathering");

  return (
    <nav
      style={{ zIndex: 99 }}
      className={`
      fixed pointer-events-auto left-0 right-0 bottom-0 bg-base-white w-full max-w-[430px] 
      flex justify-between px-3 pt-1 pb-2
      border-t border-grayscale-10 mx-auto
      transition-all duration-900 ease-in-out
    `}
    >
      {isFetching ? (
        <DotSpinnerSmall />
      ) : (
        NAV_ITEMS.map((item, idx) => (
          <NavLink
            key={item.href.slice(1)}
            href={item.href}
            isActive={idx === activeBtn || pathname === item.href}
            onClick={() => {
              setActiveBtn(idx);
            }}
            icon={item.icon}
            profileImageUrl={user?.profileImageUrl || imageUrl}
          />
        ))
      )}

      {(showSheetButton || pathname === "/") && <FloatingButton tooltip />}
    </nav>
    // portalRoot
  );
};

export default NavBar;
