import ArrowLeftIcon from "../Icon/ArrowLeftIcon";
import Spacing from "../Spacing";

export default function HeaderWithBackBtn({
  fixedNot,
  pageName,
  fontColor,
  color,
  icon,
}: {
  fixedNot?: boolean;
  pageName: string;
  fontColor?: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={
        "min-w-[320px] max-w-[430px] w-full flex justify-between items-center h-12 bg-base-white text-[18px] font-[700] leading-[23.4px] tracking-[-0.54px] gap-[6px] pl-[0px] pr-5"
      }
      style={{
        zIndex: 12,
        position: fixedNot ? "relative" : "fixed",
        top: 0,
        backgroundColor: color ? color : "transparent",
      }}
    >
      <button
        className={
          "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer active:animate-shrink-grow"
        }
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowLeftIcon color={fontColor} />
      </button>
      <div
        style={{
          color: fontColor ? fontColor : "",
        }}
        className="flex-1"
      >
        {pageName}
      </div>
      <Spacing size={6} />

      {icon && (
        <>
          <Spacing size={6} />
          {icon}
        </>
      )}
    </div>
  );
}
