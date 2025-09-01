"use client";

import { Suspense } from "react";
import KakaoLoginClient from "./KakaoLoginClient";

export default function Page() {
  return (
    <Suspense>
      <KakaoLoginClient />
    </Suspense>
  );
}
