import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextLayout, { NextProvider } from "./providers";
import GoogleAnalytics from "./lib/GoogleAnalytics";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Lighty",
  description: "소중한 당신의 추억이 빛나도록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <body className={`${pretendard.variable} antialiased h-full`}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
        <div
          className="fixed left-0 right-0 bottom-0 mx-auto flex justify-center z-10"
          id="root-portal"
        ></div>
      </body>
    </html>
  );
}
