import Link from "next/link";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  onClick: () => void;
  icon: (isActive: boolean, profileUrl: string) => React.ReactNode;
  profileImageUrl?: string | null;
}

export const NavLink = ({
  href,
  isActive,
  onClick,
  icon,
  profileImageUrl,
}: NavLinkProps) => {
  return (
    <Link href={href} passHref>
      <div
        className="pointer-events-none flex justify-center w-16 h-11 items-center hover:animate-shrink-grow"
        onMouseDown={onClick}
      >
        {icon(isActive, profileImageUrl ?? "")}
      </div>
    </Link>
  );
};
