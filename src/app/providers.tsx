"use client";
import { RecoilRoot } from "recoil";

interface Props {
  children?: React.ReactNode;
}
declare global {
  interface Window {
    mazeUniversalSnippetApiKey?: string;
  }
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import NavBar from "@/components/shared/NavBar";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (function (m, a, z, e) {
        let t;
        try {
          t = m.sessionStorage.getItem("maze-us");
        } catch (err) {
          console.log(err);
        }
        if (!t) {
          t = new Date().getTime();
          try {
            m.sessionStorage.setItem("maze-us", String(t));
          } catch (err) {
            console.log(err);
          }
        }
        const s = a.createElement("script");
        s.src = z + "?apiKey=" + e;
        s.async = true;
        const head = a.getElementsByTagName("head")[0];
        if (head.firstChild) {
          head.insertBefore(s, head.firstChild);
        } else {
          head.appendChild(s);
        }
        m.mazeUniversalSnippetApiKey = e;
      })(
        window,
        document,
        "https://snippet.maze.co/maze-universal-loader.js",
        "53e53558-0ca6-41d1-b326-df8de0da9cf4"
      );
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId="819938529870-7ng56emjnvtfds459lrb7h1a9g04r4q5.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>{children}</RecoilRoot>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

const NextLayout = ({ children }: Props) => {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  {
    return (
      <div
        style={{
          position: "relative",
          maxWidth: "430px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <>{children}</>
        {pathname === "/home" ||
        pathname === "/" ||
        pathname === "/gathering" ||
        pathname === "/feed" ||
        pathname === "/schedule" ||
        pathname === "/my" ? (
          <NavBar />
        ) : null}
      </div>
    );
  }
};

export default NextLayout;
