import CalendarIcon from "@/components/shared/icons/CalendarIcon";
import FeedIcon from "@/components/shared/icons/FeedIcon";
import HomeIcon from "@/components/shared/icons/HomeIcon";
import UserIcon from "@/components/shared/icons/UserIcon";
import Image from "next/image";

interface NavItem {
  href: string;
  icon: (isActive: boolean) => React.ReactNode;
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
        className={
          isActive
            ? "rounded-full border-2 border-grayscale-900"
            : "rounded border-none"
        }
        src="https://d20j4cey9ep9gv.cloudfront.net/anton.PNG"
        width={24}
        height={24}
        alt="profileImage"
      />
    ),
  },
];

export default NAV_ITEMS;
