"use client";
import { newGroupAtom } from "@/atoms/group";
import useMakeGroup from "@/components/groups/hooks/useMakeGroup";
import FixedBottomButton from "@/components/shared/Button/FixedBottomButton";
import getHeader from "@/utils/getHeader";
import { useRecoilState } from "recoil";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/utils/toast";
import { CreateGroupRequest } from "@/models/group";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import ErrorPage from "@/components/shared/ErrorPage";
import NewGroupForm from "@/components/groups/NewGroupForm";

const MakingGroupSuccess = dynamic(
  () => import("@/components/groups/MakingGroupSuccess"),
  { ssr: false, loading: () => <DotSpinner /> }
);

const InviteFriends = dynamic(
  () => import("@/components/friends/InviteFriends"),
  { ssr: false, loading: () => <DotSpinner /> }
);

export default function NewGroupPage() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const queryClient = useQueryClient();
  const header = useMemo(() => getHeader("/groups/new"), []);
  const [newGroup, setNewGroup] =
    useRecoilState<CreateGroupRequest>(newGroupAtom);
  const [step, setStep] = useState(1);
  const [groupImageUrl, setGroupImageUrl] = useState<string>("");

  const makeGroupSuccessHandler = async (data: { message: string }) => {
    setStep(0);
    Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["groups"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["user/detail"],
      }),
    ]);
    lightyToast.success(data.message);
  };

  const { mutate: makeGroup, isPending } = useMakeGroup({
    group: { ...newGroup, groupImageUrl: groupImageUrl },
    onSuccess: makeGroupSuccessHandler,
  });

  useEffect(() => {
    if (!isClient) return;
    return setNewGroup({
      name: "",
      description: "",
      friendIds: null,
      groupImageUrl: "",
    });
  }, [isClient, pathname]);

  useEffect(() => {
    if (!isClient) setIsClient(true);
  }, [isClient]);

  if (!isClient) {
    return <ErrorPage />;
  }

  if (step === 0 || isPending) {
    return (
      <MakingGroupSuccess
        group={{ ...newGroup, groupImageUrl: groupImageUrl }}
        isPending={isPending}
      />
    );
  }

  if (step === 2) {
    return <InviteFriends setStep={setStep} type="group" />;
  }

  return (
    <div className="min-h-[calc(100dvh+74px)] bg-base-white">
      {header}
      <NewGroupForm
        groupImageUrl={groupImageUrl}
        setGroupImageUrl={setGroupImageUrl}
        setStep={setStep}
        newGroup={newGroup}
        setNewGroup={setNewGroup}
      />
      <FixedBottomButton
        label={"그룹 생성하기"}
        onClick={makeGroup}
        disabled={newGroup.friendIds == null || newGroup.friendIds.length < 1}
      />
    </div>
  );
}
