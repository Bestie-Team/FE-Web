"use client";
import AddPhoto from "@/components/shared/AddPhoto";
import FixedBottomButton from "@/components/shared/Button/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import Input from "@/components/shared/Input/Input";
import Spacing from "@/components/shared/Spacing";
import getHeader from "@/utils/getHeader";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function EditPage() {
  const [changed, setChanged] = useState(false);
  const pathname = usePathname();
  const header = getHeader(pathname);
  return (
    <div className="h-screen bg-base-white">
      {header}
      <Flex direction="column" className="px-[20px]">
        <Spacing size={58} />
        <Flex justify="center" className="py-[12px] ">
          <AddPhoto small={false} />
        </Flex>
        <Spacing size={40} />
        <Input value="" label={<span>이름</span>} onChange={() => {}} />
        <Spacing size={30} />
        <Input
          value=""
          label={<span>프로필 아이디</span>}
          onChange={() => {
            setChanged(true);
          }}
          displayLength={15}
        />
      </Flex>
      <FixedBottomButton label="변경 완료" disabled={changed === false} />
    </div>
  );
}
