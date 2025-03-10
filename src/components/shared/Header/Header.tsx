import clsx from "clsx";
import Spacing from "../Spacing";

export default function Header({
  pageName,
  icon,
}: {
  pageName: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      style={{
        top: 0,
        position: "fixed",
        zIndex: 12,
      }}
      className={clsx(
        "min-w-[320px] max-w-[430px] w-full flex justify-between items-center min-h-12 bg-base-white pl-5 text-[20px] font-[700] leading-[26px] tracking-[-0.3px]",
        window.ReactNativeWebView ? "pt-safe-top" : ""
      )}
    >
      <span>{pageName}</span>
      {icon && (
        <>
          <Spacing size={8} />
          <div className="pr-5">{icon}</div>
        </>
      )}
    </div>
  );
}
