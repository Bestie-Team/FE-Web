import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Lighty } from "@/constants/images";
import clsx from "clsx";

export default function GroupBannerContainer({
  imageUrl,
  isLoaded,
  setIsLoaded,
}: {
  imageUrl: string;
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <Image
        priority
        alt="groupImage"
        src={
          imageUrl
            ? `${imageUrl}?w=${500}&q=${95}`
            : `${Lighty}?w=${500}&q=${95}`
        }
        unoptimized={true}
        width={500}
        height={380}
        className={clsx(
          "h-[380px] w-[500px] object-cover",
          `transition-opacity duration-75 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`
        )}
        onLoad={() => setIsLoaded(true)}
      />
      <div className={styles.shade} />
    </>
  );
}

const styles = {
  shade: "absolute inset-0 bg-transparent-black-50",
};
