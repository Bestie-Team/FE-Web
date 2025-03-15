import { useEffect, useRef, useState } from "react";

export function useDropdown() {
  const [openedDropdownId, setOpenedDropdownId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (ref.current?.contains(target)) return;
    if (btnRef.current && !btnRef.current.contains(target)) {
      setOpenedDropdownId(null);
    }
  };

  const closeDropdown = () => {
    setOpenedDropdownId(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (feedId: string) => {
    setOpenedDropdownId(openedDropdownId === feedId ? null : feedId);
  };

  return { openedDropdownId, ref, btnRef, toggleDropdown, closeDropdown };
}

export function useFriendsBox() {
  const [openedBoxId, setOpenedBoxId] = useState<string | null>(null);
  const c_ref = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (c_ref.current?.contains(target)) return;
    if (boxRef.current && !boxRef.current.contains(target)) {
      setOpenedBoxId(null);
    }
  };

  const closeBox = () => {
    setOpenedBoxId(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleBox = (boxId: string) => {
    setOpenedBoxId(openedBoxId === boxId ? null : boxId);
    console.log(boxId, "boxId");
  };

  return { openedBoxId, c_ref, boxRef, toggleBox, closeBox };
}

export function useDropdownWithNoId() {
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
