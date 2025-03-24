import CalendarIcon from "@/components/shared/Icon/CalendarIcon";
import FeedIcon from "@/components/shared/Icon/FeedIcon";
import LightyLogoForNavBar from "@/components/shared/Icon/LightyLogoForNavBar";
import UserIcon from "@/components/shared/Icon/UserIcon";
import Image from "next/image";

const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty_square.png";

interface NavItem {
  href: string;
  name: string;
  icon: (isActive: boolean, src?: string) => React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/feed",
    name: "feed",
    icon: (isActive: boolean) => (
      <FeedIcon color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },

  {
    href: "/gathering",
    name: "gathering",
    icon: (isActive: boolean) => (
      <CalendarIcon color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },
  {
    href: "/card",
    name: "card",
    icon: (isActive: boolean) => (
      <LightyLogoForNavBar color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },
  {
    href: "/social",
    name: "social",
    icon: (isActive: boolean) => (
      <UserIcon color={isActive ? "#0A0A0A" : "#AEAEAE"} />
    ),
  },
  {
    href: "/my",
    name: "my",
    icon: (isActive: boolean, src?: string) => (
      <Image
        className={`w-6 h-6 box-content border-[1.7px] rounded-full object-cover ${
          isActive ? "border-grayscale-900" : "border-none"
        }`}
        src={src || DEFAULT_IMAGE}
        width={24}
        height={24}
        alt="profileImage"
      />
    ),
  },
];

export default NAV_ITEMS;
