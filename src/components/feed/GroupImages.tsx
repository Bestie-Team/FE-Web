import Image from "next/image";

export default function GroupImages() {
  return (
    <div style={{ height: "28px", position: "relative", width: "68px" }}>
      <Image
        src="/images/anton.png"
        width={28}
        height={28}
        style={{ position: "absolute", left: 0 }}
        className={groupImageStyle}
        alt="writerImage1"
      />
      <Image
        src="/images/anton.png"
        width={28}
        height={28}
        className={groupImageStyle}
        style={{ position: "absolute", left: "20px" }}
        alt="writerImage2"
      />
      <Image
        src="/images/anton.png"
        width={28}
        height={28}
        className={groupImageStyle}
        style={{ position: "absolute", left: "40px" }}
        alt="writerImage3"
      />
    </div>
  );
}

const groupImageStyle =
  "rounded-full overflow-hidden border-[1px] border-base-white";
