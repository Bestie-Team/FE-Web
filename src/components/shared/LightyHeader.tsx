interface HeaderProps {
  visible?: boolean;
  title?: string;
  customStyle?: React.CSSProperties;
  bgColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  visible = true,
  title,
  customStyle,
  bgColor,
}) => {
  if (!visible) return null;

  return (
    <header
      style={{
        padding: "1rem",
        backgroundColor: bgColor ?? "lightblue",
        ...customStyle,
      }}
    >
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
