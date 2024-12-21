import CalendarIcon from "@/components/shared/icons/CalendarIcon";
import FeedIcon from "@/components/shared/icons/FeedIcon";
import HomeIcon from "@/components/shared/icons/HomeIcon";
import LightyLogoForNavBar from "@/components/shared/icons/LightyLogoForNavBar";
import Image from "next/image";

interface NavItem {
  href: string;
  icon: (isActive: boolean, src?: string) => React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/home",
    icon: (isActive: boolean) => (
      <HomeIcon color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },
  {
    href: "/record",
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
        className={`border-2 rounded-full ${
          isActive ? "border-grayscale-900" : "border-none"
        }`}
        src={src || "https://d20j4cey9ep9gv.cloudfront.net/cute.jpg"}
        width={24}
        height={24}
        alt="profileImage"
      />
    ),
  },
];

export default NAV_ITEMS;
