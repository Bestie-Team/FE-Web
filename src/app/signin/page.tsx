// import { signIn, providerMap, auth } from "../../../auth";
// import { AuthError } from "next-auth";

import { Metadata } from "next";

import Splash from "@/components/Splash";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign Up or Login to Lighty",
};

export default async function SignInPage() {
  //   const session = await auth();
  //   const user = session?.user;
  //   if (user) {
  //     redirect("/");
  //   }
  // const redirectTo = searchParams.callbackUrl;
  return <Splash />;
}
