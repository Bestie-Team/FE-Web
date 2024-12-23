import { Metadata } from "next";

import Splash from "@/components/Splash";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign Up or Login to Lighty",
};

export default async function SignInPage() {
  return <Splash />;
}
