"use client";
import Record from "@/components/feeds";
import clsx from "clsx";

export default function RecordPage() {
  return (
    <div
      className="relative pt-12 h-dvh"
      style={
        window.ReactNativeWebView
          ? {
              paddingTop: `calc(env(safe-area-inset-top) + 3rem)`,
            }
          : {}
      }
    >
      <Record />
    </div>
  );
}
