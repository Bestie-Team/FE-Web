"use client";
import AddPhoto from "@/components/shared/AddPhoto";
import FixedBottomButton from "@/components/shared/buttons/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import Input from "@/components/shared/inputs/Input";
import Spacing from "@/components/shared/Spacing";
import HeaderReturner from "@/utils/headerReturner";
import { useState } from "react";

export default function EditPage() {
  const [changed, setChanged] = useState(false);
  return (
    <div className="h-screen">
      {HeaderReturner()}
      <Flex direction="column">
        <Spacing size={58} />
        <Flex justify="center" className="px-[20px] py-[12px] ">
          <AddPhoto small={false} />
        </Flex>
        <Spacing size={8} />
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
