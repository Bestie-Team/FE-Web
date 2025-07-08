import { useMemo, memo, useEffect, useState, Suspense } from "react";
import NAV_ITEMS from "@/constants/navBar";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";
import { NavLink } from "./NavLink";
import useUserProfile from "../../users/hooks/useUserProfile";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { useReactNativeWebView } from "../../shared/providers/ReactNativeWebViewProvider";

const FloatingButton = dynamic(
  () => import("../../shared/Button/FloatingButton"),
  {
    ssr: false,
  }
);

const MemoizedNavLink = memo(NavLink);
const SHOW_SHEET_PATHS = ["/feed"];

const NavBar = () => {
  const { data: user } = useUserProfile();
  const { setActiveBtn, pathname, activeBtn } = useActiveNavigation();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const { isReactNativeWebView } = useReactNativeWebView();
  const showSheetButton = useMemo(() => {
    return (
      SHOW_SHEET_PATHS.some((path) => pathname.startsWith(path)) ||
      pathname.endsWith("/gathering")
    );
  }, [pathname]);

  const tooltip = !user?.hasFeed;

  const onMouseDownHandler = (idx: number) => {
    if (activeBtn === idx) {
      window.location.reload();
    } else setActiveBtn(idx);
  };

  const items = NAV_ITEMS.map((item, idx) => (
    <MemoizedNavLink
      name={item.name}
      key={item.href}
      href={item.href}
      isActive={pathname === item.href}
      onMouseDown={() => onMouseDownHandler(idx)}
      icon={item.icon}
      profileImageUrl={profileImageUrl}
    />
  ));

  const shouldShowFloatingButton = useMemo(() => {
    return showSheetButton;
  }, [showSheetButton, pathname]);

  useEffect(() => {
    if (!profileImageUrl) {
      if (user?.profileImageUrl) {
        setProfileImageUrl(user.profileImageUrl);
      }
    }
  }, [profileImageUrl, user]);

  if (!user) {
    return null;
  }

  return (
    <Suspense>
      <nav
        style={{ zIndex: 99 }}
        className={clsx(
          `
        fixed left-0 right-0 bottom-0 bg-base-white w-full max-w-[430px]
        flex justify-between px-3 mx-auto pt-1 pb-1 min-h-[52px]
        border-t border-grayscale-10`,
          isReactNativeWebView ? "!pb-safe-bottom" : ""
        )}
      >
        {items}
        {shouldShowFloatingButton && <FloatingButton tooltip={tooltip} />}
      </nav>
    </Suspense>
  );
};

export default NavBar;
