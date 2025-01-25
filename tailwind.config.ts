import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html", // HTML 파일
    "./src/**/*.{js,ts,jsx,tsx}", // React 컴포넌트
  ],
  theme: {
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      grayscale: {
        10: "#F8F8F8",
        50: "#F4F4F4",
        100: "#E9E9E9",
        200: "#D8D8D8",
        300: "#AEAEAE",
        400: "#979797",
        500: "#808080",
        600: "#686868",
        700: "#515151",
        800: "#393939",
        900: "#0A0A0A",
      },
      base: {
        white: "#FFFFFF",
      },
      point: {
        red50: "#FA6767",
        success: "#FA6767",
      },
      transparent: {
        black: {
          50: "rgba(0, 0, 0, 0.5)",
          70: "rgba(0, 0, 0, 0.7)",
        },
      },
    },
    extend: {
      boxShadow: {
        sm: "0px 0px 16px 0px #0000001f",
        md: "0px 0px 16px 0px #0000001f",
        lg: "0px 0px 16px 0px #0000001f",
        custom: "0px 0px 12px 0px #0000001F",
        bottom: "0px 2px 12px 0px #00000014",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        // Typography T
        T1: [
          "24px",
          { lineHeight: "130%", letterSpacing: "-0.72px", fontWeight: 600 },
        ],
        T2: [
          "20px",
          { lineHeight: "130%", letterSpacing: "-0.6px", fontWeight: 600 },
        ],
        T3: [
          "18px",
          { lineHeight: "130%", letterSpacing: "-0.54px", fontWeight: 600 },
        ],
        T4: [
          "16px",
          { lineHeight: "130%", letterSpacing: "-0.48px", fontWeight: 600 },
        ],
        T5: [
          "14px",
          { lineHeight: "130%", letterSpacing: "-0.42px", fontWeight: 600 },
        ],
        T6: [
          "13px",
          { lineHeight: "130%", letterSpacing: "-0.39px", fontWeight: 600 },
        ],

        // Typography B
        B1: [
          "18px",
          { lineHeight: "20px", letterSpacing: "-0.54px", fontWeight: 500 },
        ],
        B2: [
          "16px",
          { lineHeight: "20px", letterSpacing: "-0.48px", fontWeight: 500 },
        ],
        B3: [
          "14px",
          { lineHeight: "20px", letterSpacing: "-0.42px", fontWeight: 500 },
        ],
        B4: [
          "13px",
          { lineHeight: "20px", letterSpacing: "-0.39px", fontWeight: 500 },
        ],
        B5: [
          "14px",
          { lineHeight: "20px", letterSpacing: "-0.42px", fontWeight: 400 },
        ],
        // Typography C
        C1: [
          "12px",
          { lineHeight: "14px", letterSpacing: "-0.36px", fontWeight: 600 },
        ],
        C2: [
          "12px",
          { lineHeight: "14px", letterSpacing: "-0.36px", fontWeight: 500 },
        ],
        C3: [
          "12px",
          { lineHeight: "14px", letterSpacing: "-0.36px", fontWeight: 400 },
        ],
        C4: [
          "10px",
          { lineHeight: "14px", letterSpacing: "-0.3px", fontWeight: 600 },
        ],
        C5: [
          "10px",
          { lineHeight: "14px", letterSpacing: "-0.3px", fontWeight: 500 },
        ],
      },
      fontWeight: {
        bold: "700",
        semibold: "600",
        medium: "500",
        regular: "400",
      },
      animation: {
        "slide-up": "slide-up 0.5s ease-in-out forwards",
        slideIn: "slideIn 0.2s ease-in-out",
        slideOut: "slideOut 0.2s ease-in-out",
        fadeIn: "fadeIn 0.2s ease-in",
        fadeOut: "fadeOut 0.2s ease-out",
        selectOpen: "selectOpen 0.2s ease-in-out",
        "shrink-grow": "shrinkGrow 0.5s ease-in-out",
        "shrink-grow-less": "shrinkGrowLess 0.3s ease-in-out",
        "slide-from-left": "slideFromLeft 0.3s ease-in-out",
        tinkle: "tinkle 0.5s ease-in-out",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideIn: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        slideFromLeft: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateY(0)" },
        },
        slideOut: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        selectOpen: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
            visibility: "hidden",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            visibility: "visible",
          },
        },
        shrinkGrow: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.85)" },
          "100%": { transform: "scale(1)" },
        },
        shrinkGrowLess: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.94)" },
          "100%": { transform: "scale(1)" },
        },
        tinkle: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
