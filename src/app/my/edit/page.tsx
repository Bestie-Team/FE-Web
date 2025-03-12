"use client";
import useUpdateAccountId from "@/components/my/hooks/usePatchAccountId";
import useUpdateProfile from "@/components/my/hooks/useUpdateProfile";
import FixedBottomButton from "@/components/shared/Button/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import Input from "@/components/shared/Input/Input";
import ProfileImageDisplay from "@/components/shared/ProfileImageDisplay";
import { useReactNativeWebView } from "@/components/shared/providers/ReactNativeWebViewProvider";
import Spacing from "@/components/shared/Spacing";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import getHeader from "@/utils/getHeader";
import { lightyToast } from "@/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Suspense, useState } from "react";

export default function EditPage() {
  const { data } = useUserDetail();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<{
    accountId: string;
    profileImageUrl: string;
  }>({
    accountId: data?.accountId || "",
    profileImageUrl: data?.profileImageUrl || "",
  });
  const header = getHeader("/my/edit");
  const { isReactNativeWebView } = useReactNativeWebView();

  const { mutate: updateImage } = useUpdateProfile({
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["user/detail"],
      });
    },
    onError: (error) => lightyToast.error(error.message),
  });

  const { mutate: updateId } = useUpdateAccountId({
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      Promise.all([
        await queryClient.invalidateQueries({
          queryKey: ["user/detail"],
        }),
        await queryClient.invalidateQueries({
          queryKey: ["groups"],
        }),
      ]);
    },
    onError: (error) => lightyToast.error(error.message),
  });

  const handlePatch = () => {
    if (profile.profileImageUrl !== data?.profileImageUrl) {
      updateImage({
        profileImageUrl: profile.profileImageUrl,
      });
    }
    if (data?.accountId !== profile.accountId) {
      updateId({
        accountId: profile.accountId,
      });
    }
  };

  return (
    <div className="min-h-dvh bg-base-white">
      <Suspense fallback={<DotSpinner />}>
        {header}
        <Flex
          direction="column"
          className={clsx("px-5", isReactNativeWebView ? "pt-safe-top" : "")}
        >
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
        <FixedBottomButton
          label="변경 완료"
          disabled={
            profile.profileImageUrl == data?.profileImageUrl &&
            profile.accountId == data?.accountId
          }
          onClick={handlePatch}
          className={isReactNativeWebView ? "mb-safe-bottom" : ""}
        />
      </Suspense>
    </div>
  );
}
