import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import ArrowLeftIcon from "../shared/Icon/ArrowLeftIcon";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import { useRouter } from "next/navigation";
import GroupOptions from "./GroupOptions";
import * as lighty from "lighty-type";
import { useAuth } from "../shared/providers/AuthProvider";
const DEFAULT_IMAGE = "/lighty_square.png";

export default function GroupBannerContainer({
  imageUrl,
  owner,
  setIsLoaded,
}: {
  imageUrl: string;
  owner: lighty.User;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { accountId } = owner;
  const { userInfo } = useAuth();
  const isOwner = accountId === userInfo?.accountId;
  return (
    <div className="relative">
      <Image
        priority
        alt="groupBannerImage"
        src={imageUrl || DEFAULT_IMAGE}
        width={600}
        height={316}
        className="h-[316px] object-cover"
        onLoadingComplete={() => setIsLoaded(true)}
      />
      <div className={styles.shade} />
      <Flex align="center" className={styles.headerWrapper}>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon color="white" />
        </div>
        <Spacing size={6} direction="horizontal" />
        <span className={styles.headerFont}>그룹 상세</span>
        <Spacing size={6} direction="horizontal" />
        <GroupOptions isOwner={isOwner} />
      </Flex>
    </div>
  );
}

const styles = {
  shade: "absolute inset-0 bg-transparent-black-50",
  headerWrapper:
    "w-full before:h-[48px] absolute left-0 top-0 pl-[17px] pr-5 items-center",

  headerFont: "flex-grow text-T3 text-base-white",
};
