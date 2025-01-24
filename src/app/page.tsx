"use client";
import FullPageLoader from "@/components/shared/FullPageLoader";
import Splash from "@/components/Splash";
import { Suspense } from "react";

export default function SplashPage() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Splash />
    </Suspense>
  );
}
