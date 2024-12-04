import Image from "next/image";
import Button from "./buttons/Button";
import CalendarIcon from "./icons/CalendarIcon";
import HomeIcon from "./icons/HomeIcon";
import StarsIcon from "./icons/StarsIcon";
import UserIcon from "./icons/UserIcon";
import clsx from "clsx";

export default function NavBar() {
  const isActive = false;

  return (
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
    </div>
  );
}

const NavBarWrapperStyle =
  "w-[390px] flex justify-between px-[12px] py-[4px] pb-[16px] border-t-[1px] border-grayscale-10 mx-auto";

const iconWrapperStyle = "flex justify-center h-[44px] items-center";
