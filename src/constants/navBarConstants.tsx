import CalendarIcon from "@/components/shared/Icon/CalendarIcon";
import FeedIcon from "@/components/shared/Icon/FeedIcon";
import HomeIcon from "@/components/shared/Icon/HomeIcon";
import LightyLogoForNavBar from "@/components/shared/Icon/LightyLogoForNavBar";
import Image from "next/image";

interface NavItem {
  href: string;
  icon: (isActive: boolean, src?: string) => React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    icon: (isActive: boolean) => (
      <HomeIcon color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },
  {
    href: "/gathering",
    icon: (isActive: boolean) => (
      <LightyLogoForNavBar color={isActive ? "#0A0A0A" : "#AEAEAE"} />
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
    icon: (isActive: boolean, src?: string) => (
      <Image
        className={`box-content border-[1.7px] rounded-full aspect-square ${
          isActive ? "border-grayscale-900" : "border-none"
        }`}
        src={src || "/lighty_square.png"}
        width={24}
        height={24}
        alt="profileImage"
      />
    ),
  },
];

export default NAV_ITEMS;
