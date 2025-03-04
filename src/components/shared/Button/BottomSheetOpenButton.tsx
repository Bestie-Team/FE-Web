import clsx from "clsx";
import PlusIcon from "../Icon/PlusIcon";

export default function BottomSheetOpenButton({
  style,
  className,
  onClick,
  icon,
}: {
  className?: string;
  style?: { bottom: string; right: string };
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <div
      data-testid="plus-circle-button"
      style={style}
      className={clsx(PlusButtonStyle, className)}
      onClick={onClick}
      onTouchStart={(e) => e.preventDefault()}
    >
      {icon ? icon : <PlusIcon width="23.3" height="23.3" />}
    </div>
  );
}

const PlusButtonStyle =
  "z-999 bg-grayscale-900 rounded-full w-14 h-14 flex items-center justify-center";

export function PlusCircleButtonSmall({
  className,
  style,
  width,
  height,
}: {
  className?: string;
  style?: { bottom: string; right: string };
  width?: string;
  height?: string;
}) {
  return (
    <div
      data-testid="plus-circle-button-small"
      style={style}
      className={clsx(PlusButtonStyleSmall, className)}
    >
      <PlusIcon width={width ?? "13.71"} height={height ?? "13.71"} />
    </div>
  );
}

const PlusButtonStyleSmall =
  "bg-grayscale-900 rounded-full w-6 h-6 flex items-center justify-center";
