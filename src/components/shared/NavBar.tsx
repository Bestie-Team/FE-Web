import Image from "next/image";
import Button from "./buttons/Button";
import CalendarIcon from "./icons/CalendarIcon";
import HomeIcon from "./icons/HomeIcon";
import StarsIcon from "./icons/StarsIcon";
import UserIcon from "./icons/UserIcon";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PlusButton from "./buttons/PlusButton";

export default function NavBar() {
  const isActive = false;

  const [isClient, setIsClient] = useState(false);

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
      <Button className={iconWrapperStyle}>
        <HomeIcon />
      </Button>
      <Button className={iconWrapperStyle}>
        <UserIcon />
      </Button>
      <Button className={iconWrapperStyle}>
        <StarsIcon />
      </Button>
      <Button className={iconWrapperStyle}>
        <CalendarIcon />
      </Button>
      <Button className={iconWrapperStyle}>
        <Image
          className={clsx(
            "rounded-full border-2 ",
            isActive ? "border-grayscale-900" : ""
          )}
          src="/images/anton.PNG"
          width={24}
          height={24}
          alt="profileImage"
        />
      </Button>
      <PlusButton className="absolute bottom-[80px] right-[16px] z-10" />
    </div>,
    $portalRoot
  );
}

const NavBarWrapperStyle =
  "fixed bottom-0 bg-base-white w-full max-w-[430px] flex justify-between px-[12px] py-[4px] pb-[16px] border-t-[1px] border-grayscale-10 mx-auto";

const iconWrapperStyle = "flex justify-center w-[64px] h-[44px] items-center";
