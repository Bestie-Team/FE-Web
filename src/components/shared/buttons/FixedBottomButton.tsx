"use client";
import { createPortal } from "react-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function FixedBottomButton({
  label,
  onClick,
  className,
  disabled,
}: FixedBottomButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const $portalRoot = document.getElementById("root-portal");
  if ($portalRoot == null) return null;

  return createPortal(
    <div className={buttonWrapperStyle}>
      <Button
        onClick={onClick}
        disabled={true}
        className={clsx(
          buttonStyle,
          disabled
            ? `bg-grayscale-300 cursor-none`
            : `bg-grayscale-900 hover:bg-blue-700`,
          className
        )}
      >
        {label}
      </Button>
    </div>,
    $portalRoot
  );
}

const buttonStyle = `max-w-full min-w-[350px] py-[18px] text-center font-bold text-[white] rounded-full cursor-pointer `;
const buttonWrapperStyle = `p-5 bg-white animate-slide-up`;
