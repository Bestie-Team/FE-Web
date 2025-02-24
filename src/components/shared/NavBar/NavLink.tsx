import Link from "next/link";

interface NavLinkProps {
  href: string;
  name: string;
  isActive: boolean;
  onMouseDown: () => void;
  icon: (isActive: boolean, profileUrl: string) => React.ReactNode;
  profileImageUrl?: string | null;
}

export const NavLink = ({
  href,
  name,
  isActive,
  onMouseDown,
  icon,
  profileImageUrl,
}: NavLinkProps) => {
  return (
    <Link
      aria-label={`move to ${name} page`}
      href={href}
      onMouseDown={onMouseDown}
    >
      <div className="flex justify-center w-16 h-11 items-center hover:animate-shrink-grow">
        {icon(isActive, profileImageUrl ?? "")}
      </div>
    </Link>
  );
};
