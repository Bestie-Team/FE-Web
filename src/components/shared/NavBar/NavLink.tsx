import Link from "next/link";

interface NavLinkProps {
  href: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
  icon: (isActive: boolean, profileUrl: string) => React.ReactNode;
  profileImageUrl?: string | null;
}

export const NavLink = ({
  href,
  name,
  isActive,
  onClick,
  icon,
  profileImageUrl,
}: NavLinkProps) => {
  return (
    <Link aria-label={`move to ${name} page`} href={href} onClick={onClick}>
      <div className="pointer-events-none flex justify-center w-16 h-11 items-center hover:animate-shrink-grow">
        {icon(isActive, profileImageUrl ?? "")}
      </div>
    </Link>
  );
};
