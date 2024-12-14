import Image from "next/image";
import CalendarIcon from "./icons/CalendarIcon";
import HomeIcon from "./icons/HomeIcon";
import UserIcon from "./icons/UserIcon";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SheetOpenBtnContainer from "./bottomSheet";
import { useRecoilState } from "recoil";
import { locationStatusAtom } from "@/atoms/location";
import FeedIcon from "./icons/FeedIcon";

const NAV_ITEMS = [
  {
    href: "/home",
    icon: (isActive: boolean) => (
      <HomeIcon color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },
  {
    href: "/record",
    icon: (isActive: boolean) => (
      <UserIcon color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },
  {
    href: "/feed",
    icon: (isActive: boolean) => (
      <FeedIcon color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },
  {
    href: "/schedule",
    icon: (isActive: boolean) => (
      <CalendarIcon color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },
  {
    href: "/my",
    icon: (isActive: boolean) => (
      <Image
        className={profileImageStyle(isActive)}
        src="https://d20j4cey9ep9gv.cloudfront.net/anton.PNG"
        width={24}
        height={24}
        alt="profileImage"
      />
    ),
  },
];

export default function NavBar() {
  const [activeBtn, setActiveBtn] = useRecoilState<number>(locationStatusAtom);
  const [isClient, setIsClient] = useState<boolean>(false);
  const pathname = usePathname();

  const defaultBtn = useMemo(() => {
    const index = NAV_ITEMS.findIndex((item) => pathname.startsWith(item.href));
    return index === -1 ? 0 : index;
  }, [pathname]);

  useEffect(() => {
    setActiveBtn(defaultBtn);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const $portalRoot = document.getElementById("root-portal");
  if ($portalRoot == null) return null;

  return createPortal(
    <div className={NavBarWrapperStyle}>
      {NAV_ITEMS.map((item, idx) => (
        <Link
          key={item.href.slice(1)}
          href={item.href}
          className={iconWrapperStyle}
          onClick={() => setActiveBtn(idx)}
        >
          {item.icon(idx === activeBtn)}
        </Link>
      ))}
      {(pathname.startsWith("/feed") || pathname.startsWith("/home")) && (
        <SheetOpenBtnContainer />
      )}
    </div>,
    $portalRoot
  );
}

const NavBarWrapperStyle =
  "fixed bottom-0 bg-base-white w-full max-w-[430px] flex justify-between px-[12px] py-[4px] border-t-[1px] border-grayscale-10 mx-auto";

const iconWrapperStyle =
  "flex justify-center w-[64px] h-[44px] items-center transition-transform duration-300 hover:animate-shrink-grow";

const profileImageStyle = (isActive: boolean) => {
  return clsx(
    "rounded-full border-2 ",
    isActive ? "border-grayscale-900" : "border-none"
  );
};
