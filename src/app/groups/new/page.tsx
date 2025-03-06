"use client";
import getHeader from "@/utils/getHeader";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import NewGroupForm from "@/components/groups/NewGroupForm";

const InviteFriends = dynamic(
  () => import("@/components/friends/InviteFriends"),
  { ssr: false, loading: () => <DotSpinner /> }
);

export default function NewGroupPage() {
  const [step, setStep] = useState(1);

  const header = useMemo(() => getHeader("/groups/new"), []);

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
