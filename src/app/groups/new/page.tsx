"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import NewGroupForm from "@/components/groups/NewGroupForm";
import { useSetRecoilState } from "recoil";
import { newGroupAtom } from "@/atoms/group";
import { CreateGroupRequest } from "@/models/group";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";

const InviteFriends = dynamic(
  () => import("@/components/friends/InviteFriends"),
  { ssr: false, loading: () => <DotSpinner /> }
);

export default function NewGroupPage() {
  const [step, setStep] = useState(1);
  const setNewGroup = useSetRecoilState<CreateGroupRequest>(newGroupAtom);

  useEffect(() => {
    return setNewGroup({
      name: "",
      description: "",
      friendIds: null,
      groupImageUrl: "",
    });
  }, []);

  if (step === 2) {
    return <InviteFriends setStep={setStep} type="group" />;
  }
  return (
    <div className="min-h-[calc(100dvh+74px)] bg-base-white overflow-y-scroll no-scrollbar">
      <HeaderWithBtn headerLabel="그룹 생성" bgColor="white" />
      <NewGroupForm step={step} setStep={setStep} />
    </div>
  );
}
