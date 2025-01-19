export default function NArrowRightIcon({
  width,
  height,
  checked,
}: {
  width?: string;
  height?: string;
  checked?: boolean;
}) {
  return (
    <svg
      width={width ?? "16"}
      height={height ?? "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="chevron-right">
        <path
          id="Vector"
          d="M6 12L10 8L6 4"
          stroke={checked ? "#0A0A0A" : "#D8D8D8"}
          style={{
            color: "color(display-p3 0.0392 0.0392 0.0392)",
            strokeOpacity: 1,
          }}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
