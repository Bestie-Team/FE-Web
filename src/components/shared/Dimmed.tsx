import clsx from "clsx";

function Dimmed({
  children,
  onClick,
  isClosing,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  isClosing?: boolean;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "fixed inset-0 z-[var(--dimmed-zIndex)]",
        isClosing ? "animate-fadeOut" : "animate-fadeIn",
        "bg-[#00000080]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Dimmed;
