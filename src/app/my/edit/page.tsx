"use client";
import useUpdateProfile from "@/components/my/hooks/useUpdateProfile";
import FixedBottomButton from "@/components/shared/Button/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import Input from "@/components/shared/Input/Input";
import ProfileImageDisplay from "@/components/shared/ProfileImageDisplay";
import Spacing from "@/components/shared/Spacing";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import getHeader from "@/utils/getHeader";
import { lightyToast } from "@/utils/toast";
import { useState } from "react";

export default function EditPage() {
  const { data, isFetching, isError } = useUserDetail();
  const [profile, setProfile] = useState<{
    accountId: string;
    profileImageUrl: string;
  }>({
    accountId: data?.accountId || "",
    profileImageUrl: data?.profileImageUrl || "",
  });
  const header = getHeader("/my/edit");

  const { mutate } = useUpdateProfile({
    onSuccess: (data: { message: string }) => lightyToast.success(data.message),
    onError: (error) => lightyToast.error(error.message),
  });

  const handlePatch = () => {
    mutate({
      profileImageUrl: profile.profileImageUrl,
      accountId: profile.accountId,
    });
  };

  return (
    <div className="min-h-dvh bg-base-white">
      {header}
      {isFetching || isError ? (
        <DotSpinner />
      ) : (
        <Flex direction="column" className="px-5">
          <Spacing size={58} />
          <Flex justify="center" className="py-3">
            <ProfileImageDisplay
              small={false}
              userImage={data?.profileImageUrl}
              setUserImage={setProfile}
            />
          </Flex>
          <Spacing size={40} />
          <Input
            value={data?.name || ""}
            label={<span>이름</span>}
            onChange={() => {}}
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
      )}
      <FixedBottomButton
        label="변경 완료"
        disabled={
          profile.profileImageUrl == data?.profileImageUrl &&
          profile.accountId == data?.accountId
        }
        onClick={handlePatch}
      />
    </div>
  );
}
