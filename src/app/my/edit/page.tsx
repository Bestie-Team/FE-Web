"use client";
import FixedBottomButton from "@/components/shared/Button/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import Input from "@/components/shared/Input/Input";
import ProfileImageDisplay from "@/components/shared/ProfileImageDisplay";
import Spacing from "@/components/shared/Spacing";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import getHeader from "@/utils/getHeader";
import { useState } from "react";

export default function EditPage() {
  const { data } = useUserDetail();
  const [profile, setProfile] = useState<{
    name: string;
    accountId: string;
    profileImageUrl: string;
  }>({
    name: data?.name || "",
    accountId: data?.accountId || "",
    profileImageUrl: data?.profileImageUrl || "",
  });
  const header = getHeader("/my/edit");
  return (
    <div className="h-screen bg-base-white">
      {header}
      <Flex direction="column" className="px-[20px]">
        <Spacing size={58} />
        <Flex justify="center" className="py-[12px] ">
          <ProfileImageDisplay
            small={false}
            userImage={data?.profileImageUrl}
            setUserImage={setProfile}
          />
        </Flex>
        <Spacing size={40} />
        <Input
          value={profile.name}
          label={<span>이름</span>}
          onChange={(e) => {
            setProfile((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <Spacing size={30} />
        <Input
          value={profile.accountId}
          label={<span>프로필 아이디</span>}
          onChange={(e) => {
            setProfile((prev) => ({ ...prev, accountId: e.target.value }));
          }}
          displayLength={15}
        />
      </Flex>
      <FixedBottomButton
        label="변경 완료"
        disabled={
          profile.profileImageUrl == data?.profileImageUrl &&
          profile.accountId == data?.accountId
        }
      />
    </div>
  );
}
