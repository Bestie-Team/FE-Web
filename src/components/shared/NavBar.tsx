import { useMemo, memo, useEffect, useState } from "react";
import NAV_ITEMS from "@/constants/navBar";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";
import { NavLink } from "./NavBar/NavLink";
import * as lighty from "lighty-type";
import useUserDetail from "../users/hooks/useUserDetail";
import STORAGE_KEYS from "@/constants/storageKeys";
import FloatingButton from "./Button/FloatingButton";
import DotSpinner from "./Spinner/DotSpinner";

const MemoizedNavLink = memo(NavLink);
const SHOW_SHEET_PATHS = ["/feed"];

const NavBar = () => {
  const { data: user } = useUserDetail();
  const [isClient, setIsClient] = useState(false);
  const { activeBtn, setActiveBtn, pathname } = useActiveNavigation();
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

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
    if (profileImageUrl == null) {
      const userInfo = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);
      if (userInfo) {
        const parsed: lighty.LoginResponse = JSON.parse(userInfo);
        if (parsed.profileImageUrl !== null) {
          setProfileImageUrl(parsed.profileImageUrl);
        } else if (user && user?.profileImageUrl !== null) {
          setProfileImageUrl(user?.profileImageUrl);
        }
      }
    }
  }, [profileImageUrl]);

  if (!user || !isClient) {
    return <DotSpinner />;
  }

  return (
    <nav
      onTouchStart={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragStart={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
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
