import { useEffect, useRef, useState } from "react";

export function useDropdown() {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (btnRef.current?.contains(target)) return;
    if (ref.current && !ref.current.contains(target)) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setOpened((prev) => !prev);
  };

  return { opened, ref, btnRef, toggleDropdown };
}
