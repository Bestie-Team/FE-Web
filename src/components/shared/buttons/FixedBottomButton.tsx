"use client";
import { createPortal } from "react-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface FixedBottomButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  color?: string;
  bgColor?: string;
}

const FixedBottomButton: React.FC<FixedBottomButtonProps> = ({
  label,
  onClick,
  color,
  bgColor,
  className,
  disabled,
}: FixedBottomButtonProps) => {
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
    <div className={clsx(buttonWrapperStyle, bgColor)}>
      <Button
        color={color}
        onClick={() => {
          if (onClick) {
            onClick();
          } else return;
        }}
        disabled={disabled}
        className={clsx(
          buttonStyle,
          disabled
            ? `bg-grayscale-300 cursor-default`
            : `bg-grayscale-900 hover:bg-blue-700`,
          className
        )}
      >
        {label}
      </Button>
    </div>,
    $portalRoot
  );
};

const buttonStyle = `w-full py-[18px] text-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full`;
const buttonWrapperStyle = `w-full px-[20px] pb-[10px] pt-[12px] bg-base-white animate-slide-up`;

export default FixedBottomButton;
