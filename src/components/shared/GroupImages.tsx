import Image from "next/image";
import Flex from "./Flex";
import clsx from "clsx";
import { MemberInfo } from "@/constants/members";

export default function GroupImages({
  members,
  memberImageUrls,
  maxLength = 3,
  width,
  height,
  gap,
}: {
  members?: MemberInfo[];
  memberImageUrls?: string[];
  maxLength?: number;
  width?: number;
  height?: number;
  gap?: number;
}) {
  const memberImages =
    members != null
      ? (members.map((member) => member.imageUrl) as string[])
      : memberImageUrls!;

  const seenImages =
    memberImages.length <= maxLength
      ? memberImages
      : memberImages.slice(0, maxLength);

  const imageWidthHeight =
    width && height ? `w-[${width}px] h-[${height}px]` : `w-[28px] h-[28px]`;
  return (
    <Flex>
      {seenImages.map((imageUrl, i) => (
        <Image
          key={`img${i}`}
          style={{ marginLeft: i !== 0 ? `-${gap}px` : 0 }}
          src={imageUrl || "https://cdn.lighty.today/anton.PNG"}
          width={width ? width : 28}
          height={height ? height : 28}
          className={clsx(styles.groupImage, imageWidthHeight)}
          alt={`writer${i}`}
        />
      ))}
      {memberImages.length > maxLength ? (
        <div
          style={{
            marginLeft: `-${gap}px`,
            width: width ? `${width}px` : "28px",
            height: height ? `${height}px` : "28px",
          }}
          className={styles.circle}
        >{`+${memberImages.length - maxLength}`}</div>
      ) : null}
    </Flex>
  );
}

const styles = {
  groupImage:
    "object-cover rounded-full overflow-hidden border-[1px] border-base-white aspect-square",
  circle:
    "text-C4 flex items-center justify-center text-base-white bg-grayscale-300 border-[1px] border-base-white rounded-full overflow-hidden aspect-square",
};
