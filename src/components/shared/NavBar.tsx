import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SheetOpenBtnContainer from "./BottomSheet/shared/SheetOpenBtnContainer";
import { useRecoilState } from "recoil";
import { locationStatusAtom } from "@/atoms/location";
import NAV_ITEMS from "@/constants/navBarConstants";
import STORAGE_KEYS from "@/constants/storageKeys";

export default function NavBar() {
  const [activeBtn, setActiveBtn] = useRecoilState<number>(locationStatusAtom);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

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
    const imageUrlAfterSignup = localStorage.getItem(
      STORAGE_KEYS.PROFILE_IMAGE_URL
    );

    if (imageUrlAfterSignup != null) {
      setProfileImageUrl(imageUrlAfterSignup);
    }
    const user_info = sessionStorage.getItem(STORAGE_KEYS.USER_INFO);

    if (user_info != null) {
      const storedImageUrl: { accountId: string; profileImageUrl: string } =
        JSON.parse(user_info);
      setProfileImageUrl(storedImageUrl.profileImageUrl);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  const $portalRoot = document.getElementById("root-portal");
  if ($portalRoot == null) return null;

  return createPortal(
    <div className={NavBarWrapperStyle}>
      {NAV_ITEMS.map((item, idx) => {
        const isActive = idx === activeBtn;
        return (
          <Link
            key={item.href.slice(1)}
            href={item.href}
            className={iconWrapperStyle}
            onMouseDown={() => setActiveBtn(idx)}
          >
            {item.icon(isActive, profileImageUrl ? `${profileImageUrl}` : "")}
          </Link>
        );
      })}

      {(pathname.startsWith("/feed") ||
        pathname.startsWith("/home") ||
        pathname.endsWith("/gathering")) && <SheetOpenBtnContainer tooltip />}
    </div>,
    $portalRoot
  );
}

const NavBarWrapperStyle =
  "fixed bottom-0 bg-base-white w-full max-w-[430px] flex justify-between px-[12px] pt-[4px] pb-[20px] border-t-[1px] border-grayscale-10 mx-auto";

const iconWrapperStyle =
  "flex justify-center w-[64px] h-[44px] items-center transition-transform duration-300 hover:animate-shrink-grow";
