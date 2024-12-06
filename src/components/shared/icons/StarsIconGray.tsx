export default function StarsIcon({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <svg
      width={width ?? "24"}
      height={height ?? "24"}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M12.6471 1L14.3629 5.63707L19 7.35294L14.3629 9.06881L12.6471 13.7059L10.9312 9.06881L6.29412 7.35294L10.9312 5.63707L12.6471 1Z"
        stroke="#AEAEAE"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4.70588 11.5882L6.20478 13.7952L8.41177 15.2941L6.20478 16.793L4.70588 19L3.20698 16.793L1 15.2941L3.20698 13.7952L4.70588 11.5882Z"
        stroke="#AEAEAE"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
