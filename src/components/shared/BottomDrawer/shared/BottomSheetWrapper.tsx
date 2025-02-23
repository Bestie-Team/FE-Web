import React, { useState } from "react";
import Dimmed from "../../Dimmed";
import Flex from "../../Flex";
import clsx from "clsx";
import RectIcon from "../../Icon/RectIcon";

export default function BottomSheetWrapper({
  open = true,
  onClose,
  children,
  bar = true,
  bright = false,
}: {
  open?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  bar?: boolean;
  bright?: boolean;
}) {
  const [isClosing, setIsClosing] = useState(false);

  if (open === false) return null;

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
      setIsClosing(false);
    }
  };

  const handleBackdropClick = () => {
    setIsClosing(true);
  };

  return (
    <Dimmed onClick={handleBackdropClick} isClosing={isClosing} bright={bright}>
      <div
        data-testid="bottom-sheet-wrapper"
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
  "bg-base-white absolute left-0 right-0 bottom-0 rounded-t-[16px] w-full overflow-hidden z-[var(--bottomSheet-zIndex)] pb-[10px] will-change-transform";
