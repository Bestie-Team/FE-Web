import Image from "next/image";
import Flex from "./Flex";
import clsx from "clsx";

export default function GroupImages({
  width,
  height,
  gap,
}: {
  width?: number;
  height?: number;
  gap?: number;
}) {
  return (
    <Flex>
      {Array.from({ length: 3 }, () => 1).map((_, i) => (
        <Image
          key={`img${i}`}
          style={{ marginLeft: i !== 0 ? `-${gap}px` : 0 }}
          src="https://d1al3w8x2wydb3.cloudfront.net/images/anton.PNG"
          width={width ?? 28}
          height={height ?? 28}
          className={clsx(groupImageStyle)}
          alt={`writer${i}`}
        />
      ))}
    </Flex>
  );
}

const groupImageStyle =
  "rounded-full overflow-hidden border-[1px] border-base-white";
