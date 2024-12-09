"use client";
import InvitationCard from "@/components/invitation/InvitationCard";
import LightySelect from "@/components/shared/filter";
import { OptionType } from "@/components/shared/FilterBar";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import TabBar from "@/components/shared/tab/TabBar";
import { useState } from "react";

export default function InvitationPage() {
  const [year, setYear] = useState<OptionType | null>({
    value: "2024",
    label: "2024",
  });

  return (
    <div>
      <div className="fixed z-10 flex flex-col w-full pl-[20px] bg-base-white">
        <div className="w-full">
          <TabBar title1="받은 초대" title2="보낸 초대" long />
        </div>
        <div className="py-[16px]">
          <LightySelect
            borderColor="#E9E9E9"
            placeholder="년도"
            options={[
              {
                value: "2024",
                label: "2024",
              },
              {
                value: "2023",
                label: "2023",
              },
              {
                value: "2022",
                label: "2022",
              },
              {
                value: "2021",
                label: "2021",
              },
            ]}
            selected={year}
            setSelected={setYear}
          />
        </div>
      </div>
      <div>
        <Flex
          direction="column"
          style={{
            padding: "0 20px",
            paddingTop: "111px",
            overflow: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <InvitationCard />
          <Spacing size={24} />
          <InvitationCard />
          <Spacing size={24} />
          <InvitationCard />
          <Spacing size={24} />
          <InvitationCard />
          <Spacing size={24} />
          <InvitationCard />
          <Spacing size={24} />
        </Flex>
      </div>
    </div>
  );
}
