import dynamic from "next/dynamic";

const OnboardSwiper = dynamic(
  () => import("@/features/onboard/components/OnboardSwiper"),
  { ssr: false }
);

export default function OnBoardCardSlider() {
  return <OnboardSwiper />;
}
