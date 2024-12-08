import clsx from "clsx";

function Dimmed({
  children,
  onClick,
  isClosing,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  isClosing?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "fixed inset-0 z-[var(--dimmed-zindex)]",
        isClosing ? "animate-fadeOut" : "animate-fadeIn",
        "bg-transparent-black-70"
      )}
    >
      {children}
    </div>
  );
}

export default Dimmed;
