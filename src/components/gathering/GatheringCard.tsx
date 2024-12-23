import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Button from "../shared/buttons";
import PencilIcon from "../shared/icons/PencilIcon";

export default function GatheringCard({
  imageUrl,
  which,
}: {
  imageUrl: string;
  which: string;
}) {
  return (
    <div className={styles.gatheringWrapper}>
      <Image
        src={imageUrl}
        className="object-cover object-center w-full h-full"
        alt="gatheringImg"
        width={168}
        height={168}
      />
      <div
        style={{
          background: styles.gradation,
        }}
        className="absolute inset-0"
      />
      <Flex direction="column" className={styles.textWrapper}>
        <span className="text-T4">연말 술 모임</span>
        <Spacing size={4} />
        <Flex className="w-full text-C2 text-grayscale-100">
          <span className="flex-grow">날짜</span>
          <Spacing size={4} direction="horizontal" />
          <span>D-1</span>
        </Flex>
      </Flex>
      {which === "2" ? (
        <Button className={styles.button}>
          <PencilIcon color="#0A0A0A" />
        </Button>
      ) : null}
    </div>
  );
}

const styles = {
  button:
    "absolute top-[10px] right-[10px] bg-base-white rounded-[9.6px] p-[8px]",

  gradation:
    "linear-gradient(180deg, color(display-p3 0 0 0 / 0) 65%, color(display-p3 0 0 0 / 0.9) 100%)",

  textWrapper: "absolute bottom-0 inset-x-0 p-[16px] pt-0 text-base-white",

  gatheringWrapper: "relative rounded-[16px] overflow-hidden aspect-square",
};
