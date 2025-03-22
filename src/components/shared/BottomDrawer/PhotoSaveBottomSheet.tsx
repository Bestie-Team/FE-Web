import React from "react";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import Flex from "../Flex";
import Image from "next/image";
import cloudFrontLoader from "@/utils/cloudfrontLoader";

export default function PhotoSaveBottomSheet({
  src,
  open,
  onClose,
}: {
  src: string;
  open?: boolean;
  onClose: () => void;
}) {
  const handleClose = () => {
    onClose();
  };
  return (
    <BottomSheetWrapper onClose={handleClose} open={open}>
      <Flex direction="column" align="center" className="p-6 pt-1">
        <Image
          src={src}
          alt={"card"}
          width={282}
          height={372}
          loader={cloudFrontLoader}
        />
      </Flex>
    </BottomSheetWrapper>
  );
}
