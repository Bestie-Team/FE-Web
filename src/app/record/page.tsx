"use client";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import dynamic from "next/dynamic";

export default function RecordPage() {
  const Record = dynamic(() => import("@/components/feeds"), {
    loading: () => <DotSpinner />,
    ssr: false,
  });

  return <Record />;
}
