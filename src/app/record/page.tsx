"use client";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import dynamic from "next/dynamic";

const Record = dynamic(() => import("@/components/feeds"), {
  loading: () => <DotSpinner />,
  ssr: false,
});

export default function RecordPage() {
  return <Record />;
}
