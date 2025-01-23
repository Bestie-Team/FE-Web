import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import SheetOpenBtnContainer from "./BottomDrawer/shared/SheetOpenBtnContainer";
import NAV_ITEMS from "@/constants/navBarConstants";
import { useProfileImage } from "@/hooks/useProfileImage";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";
import { NavLink } from "./NavBar/NavLink";
import { useRecoilValue } from "recoil";
import { scrollAtom, scrollProgressAtom } from "@/atoms/scroll";

const NavBar = () => {
  const [isClient, setIsClient] = useState(false);
  const profileImageUrl = useProfileImage();
  const { activeBtn, setActiveBtn, pathname } = useActiveNavigation();
  const isVisible = useRecoilValue(scrollAtom);
  const scrollProgress = useRecoilValue(scrollProgressAtom);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const portalRoot = document.getElementById("root-portal");
  if (!portalRoot) return null;

  const showSheetButton =
    ["/feed", "/home"].some((path) => pathname.startsWith(path)) ||
    pathname.endsWith("/gathering");

  const opacity = 1 - scrollProgress * 2;
  const clampedOpacity = Math.max(0, Math.min(opacity, 1));

  return createPortal(
    <nav
      style={{
        opacity: isVisible ? clampedOpacity : 0,
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
      }}
      className={`
      fixed bottom-0 bg-base-white w-full max-w-[430px] 
      flex justify-between px-3 pt-1 pb-5
      border-t border-grayscale-10 mx-auto
      transition-all duration-900 ease-in-out
    `}
    >
      {NAV_ITEMS.map((item, idx) => (
        <NavLink
          key={item.href.slice(1)}
          href={item.href}
          isActive={idx === activeBtn || pathname === item.href}
          onClick={() => setActiveBtn(idx)}
          icon={item.icon}
          profileImageUrl={profileImageUrl}
        />
      ))}

      {showSheetButton && <SheetOpenBtnContainer tooltip />}
    </nav>,
    portalRoot
  );
};

export default NavBar;
