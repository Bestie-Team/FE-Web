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
      {Array.from({ length: 3 }, (_) => 1).map((_, i) => (
        <Image
          key={`img${i}`}
          style={{ marginLeft: i !== 0 ? `-${gap}px` : 0 }}
          src="https://d20j4cey9ep9gv.cloudfront.net/anton.PNG"
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
