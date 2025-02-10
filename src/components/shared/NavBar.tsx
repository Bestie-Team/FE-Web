import { useMemo, memo, useEffect, useState } from "react";
import NAV_ITEMS from "@/constants/navBar";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";
import { NavLink } from "./NavBar/NavLink";
import * as lighty from "lighty-type";
import useUserDetail from "../users/hooks/useUserDetail";
import STORAGE_KEYS from "@/constants/storageKeys";
import FloatingButton from "./Button/FloatingButton";

const MemoizedNavLink = memo(NavLink);
const SHOW_SHEET_PATHS = ["/feed"];

const NavBar = () => {
  const { data: user } = useUserDetail();
  const [isClient, setIsClient] = useState(false);
  const { activeBtn, setActiveBtn, pathname } = useActiveNavigation();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const showSheetButton = useMemo(() => {
    return (
      SHOW_SHEET_PATHS.some((path) => pathname.startsWith(path)) ||
      pathname.endsWith("/gathering")
    );
  }, [pathname]);

  const tooltip = !(user?.feedCount && user?.feedCount > 0);

  const navItems = NAV_ITEMS.map((item, idx) => (
    <MemoizedNavLink
      key={item.href}
      href={item.href}
      isActive={idx === activeBtn || pathname === item.href}
      onClick={() => setActiveBtn(idx)}
      icon={item.icon}
      profileImageUrl={profileImageUrl}
    />
  ));

  const shouldShowFloatingButton = useMemo(() => {
    return showSheetButton || pathname === "/";
  }, [showSheetButton, pathname]);

  useEffect(() => {
    setIsClient(true);

    if (!profileImageUrl) {
      const userInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);
      if (userInfo) {
        const parsed: lighty.LoginResponse = JSON.parse(userInfo);
        if (parsed.profileImageUrl) {
          setProfileImageUrl(parsed.profileImageUrl);
        } else if (user?.profileImageUrl) {
          setProfileImageUrl(user.profileImageUrl);
        }
      }
    }
  }, [user]);

  if (!user || !isClient) {
    return null;
  }

  return (
    <nav
      style={{ zIndex: 99 }}
      className={`
        fixed left-0 right-0 bottom-0 bg-base-white w-full max-w-[430px]
        flex justify-between px-3 pt-1 pb-2
        border-t border-grayscale-10 mx-auto
        transition-all duration-900 ease-in-out
      `}
    >
      {navItems}
      {shouldShowFloatingButton && <FloatingButton tooltip={tooltip} />}
    </nav>
  );
};

export default NavBar;
