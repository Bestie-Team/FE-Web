// import { signIn, providerMap, auth } from "../../../auth";
// import { AuthError } from "next-auth";
import Image from "next/image";
import { Metadata } from "next";
import LightyIcon from "@/components/shared/icons/LightyIcon";
import Tooltip from "@/components/shared/tootlips/Tooltip";
import clsx from "clsx";
import Button from "@/components/shared/buttons/Button";
import Splash from "@/components/Splash";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign Up or Login to Lighty",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: any;
}) {
  //   const session = await auth();
  //   const user = session?.user;
  //   if (user) {
  //     redirect("/");
  //   }
  // const redirectTo = searchParams.callbackUrl;
  return <Splash />;
}
