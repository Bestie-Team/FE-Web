interface SpacingProps {
  size: number;
  direction?: "horizontal" | "vertical";
}

const Spacing: React.FC<SpacingProps> = ({ size, direction = "vertical" }) => {
  const style =
    direction === "vertical" ? { height: `${size}px` } : { width: `${size}px` };

  return <div className="flex-shrink-0" style={style} />;
};

export default Spacing;
