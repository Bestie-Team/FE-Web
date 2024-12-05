import React from "react";
import Spacing from "../Spacing";
import Text from "../Text";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
}

const BaseButton = ({
  color,
  className,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: color,
      }}
      className={clsx("cursor-pointer", className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

function ButtonGroup({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {title != null ? (
        <>
          <Text>{title}</Text>
          <Spacing size={8} />
        </>
      ) : null}
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup;
};
Button.Group = ButtonGroup;

export default Button;
