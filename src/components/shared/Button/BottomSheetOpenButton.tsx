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
    >
      {icon ? icon : <PlusIcon width="23.3" height="23.3" />}
    </div>
  );
}

const PlusButtonStyle =
  "bg-grayscale-900 rounded-full w-[56px] h-[56px] flex items-center justify-center";

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
  "bg-grayscale-900 rounded-full w-[24px] h-[24px] flex items-center justify-center";
