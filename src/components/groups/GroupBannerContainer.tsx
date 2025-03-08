import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Lighty } from "@/constants/images";

export default function GroupBannerContainer({
  imageUrl,
  setIsLoaded,
}: {
  imageUrl: string;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <Image
        priority
        alt="groupImage"
        src={imageUrl || Lighty}
        width={600}
        height={316}
        className="h-[316px] w-full object-cover"
        onLoad={() => setIsLoaded(true)}
      />
      <div className={styles.shade} />
    </>
  );
}

const styles = {
  shade: "absolute inset-0 bg-transparent-black-50",
};
