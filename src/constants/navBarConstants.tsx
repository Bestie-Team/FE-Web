import CalendarIcon from "@/components/shared/Icon/CalendarIcon";
import FeedIcon from "@/components/shared/Icon/FeedIcon";
import HomeIcon from "@/components/shared/Icon/HomeIcon";
import LightyLogoForNavBar from "@/components/shared/Icon/LightyLogoForNavBar";
import Image from "next/image";
const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty_square.png";

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
      <div className="w-6 h-6">
        <Image
          layout="intrinsic"
          className={`box-content border-[1.7px] rounded-full aspect-square ${
            isActive ? "border-grayscale-900" : "border-none"
          }`}
          src={src || DEFAULT_IMAGE}
          width={24}
          height={24}
          alt="profileImage"
        />
      </div>
    ),
  },
];

export default NAV_ITEMS;
