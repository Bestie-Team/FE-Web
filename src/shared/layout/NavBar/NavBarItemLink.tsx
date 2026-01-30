import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  memo,
  useCallback,
  type MouseEvent,
  type ReactNode,
} from "react";

export interface NavBarItemLinkProps {
  href: string;
  name: string;
  isActive: boolean;
  index: number;
  onItemMouseDown?: (index: number) => void;
  icon: (isActive: boolean, src?: string) => ReactNode;
  profileImageUrl?: string | null;
}

export const NavBarItemLink = memo(function NavBarItemLink({
  href,
  name,
  isActive,
  index,
  onItemMouseDown,
  icon,
  profileImageUrl,
}: NavBarItemLinkProps) {
  const { prefetch } = useRouter();

  const handlePrefetch = () => {
    void prefetch(href);
  };

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      onItemMouseDown?.(index);
    },
    [index, onItemMouseDown],
  );

  return (
    <Link
      aria-label={`${name} 페이지로 이동`}
      aria-current={isActive ? "page" : undefined}
      href={href}
      prefetch={false}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      onMouseDown={handleMouseDown}
      className="flex justify-center w-16 h-11 items-center active:animate-shrink-grow"
    >
      {icon(isActive, profileImageUrl ?? undefined)}
    </Link>
  );
});
