"use client";
import getHeader from "@/utils/getHeader";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import NewGroupForm from "@/components/groups/NewGroupForm";
import ErrorPage from "@/components/shared/ErrorPage";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { newGroupAtom } from "@/atoms/group";
import { CreateGroupRequest } from "@/models/group";

const InviteFriends = dynamic(
  () => import("@/components/friends/InviteFriends"),
  { ssr: false, loading: () => <DotSpinner /> }
);

export default function NewGroupPage() {
  const [step, setStep] = useState(1);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const setNewGroup = useSetRecoilState<CreateGroupRequest>(newGroupAtom);
  const header = useMemo(() => getHeader("/groups/new"), []);

  useEffect(() => {
    return setNewGroup({
      name: "",
      description: "",
      friendIds: null,
      groupImageUrl: "",
    });
  }, [pathname]);

  useEffect(() => {
    if (!isClient) setIsClient(true);
  }, [isClient]);

  if (!isClient) {
    return <ErrorPage />;
  }
  if (step === 2) {
    return <InviteFriends setStep={setStep} type="group" />;
  }

  return (
    <div className="min-h-[calc(100dvh+74px)] bg-base-white">
      {header}
      <NewGroupForm step={step} setStep={setStep} />
    </div>
  );
}
