import React, { useState } from "react";
import Dimmed from "../Dimmed";
import Flex from "../Flex";
import clsx from "clsx";
import RectIcon from "../icons/RectIcon";

export default function BottomSheetWrapper({
  open = true,
  onClose,
  children,
  bar = true,
}: {
  open?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  bar?: boolean;
}) {
  const [isClosing, setIsClosing] = useState(false);

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
      setIsClosing(false);
    }
  };

  const handleBackdropClick = () => {
    setIsClosing(true);
  };
  if (open === false) return null;

  return (
    <Dimmed onClick={handleBackdropClick} isClosing={isClosing}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          containerStyle,
          `${isClosing ? "animate-slideOut" : "animate-slideIn"}`
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        <Flex direction="column">
          <Flex justify="center" className="pt-[6px] pb-[18px]">
            {bar ? <RectIcon /> : null}
          </Flex>
          {children}
        </Flex>
      </div>
    </Dimmed>
  );
}

const containerStyle =
  "bg-base-white absolute left-0 right-0 bottom-0 rounded-t-[16px] w-full overflow-hidden z-[var(--bottomSheet-zIndex)] pb-[10px]";
