import Link from "next/link";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  onClick: () => void;
  icon: (isActive: boolean, profileUrl: string) => React.ReactNode;
  profileImageUrl: string | null;
}

export const NavLink = ({
  href,
  isActive,
  onClick,
  icon,
  profileImageUrl,
}: NavLinkProps) => (
  <Link
    href={href}
    className="flex justify-center w-[64px] h-[44px] items-center transition-transform duration-300 hover:animate-shrink-grow"
    onMouseDown={onClick}
  >
    {icon(isActive, profileImageUrl ?? "")}
  </Link>
);
