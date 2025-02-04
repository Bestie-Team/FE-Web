// import { useSetRecoilState } from "recoil";
// import Tooltip from "../../Tooltip/Tooltip";
// import { homeModalStateAtom } from "@/atoms/home";
// import { usePathname } from "next/navigation";
// import { gatheringModalStateAtom } from "@/atoms/gathering";
// import { cardDecorateModalStateAtom } from "@/atoms/card";
// import BottomSheetOpenButton from "../../Button/BottomSheetOpenButton";
// import LightyDeco from "../../Icon/LightyDeco";
// import { recordModalAtom } from "@/atoms/modal";

// export default function SheetOpenBtnContainer({
//   tooltip = false,
// }: {

// }) {
//   const pathname = usePathname();
//   const getModalStateAtom = () => {
//     if (pathname.endsWith("/")) return homeModalStateAtom;
//     if (pathname.endsWith("/gathering")) return gatheringModalStateAtom;
//     if (pathname.startsWith("/card")) return cardDecorateModalStateAtom;
//     return recordModalAtom;
//   };

//   const getModalTooltip = () => {
//     if (pathname === "/") return "추억 피드를 등록해보세요!";
//     if (pathname === "/feed") return "추억 피드를 등록해보세요!";
//     if (pathname === "/gathering") return "추억 피드를 등록해보세요!";
//     if (pathname.startsWith("/card")) return "👀 스티커로 꾸며보세요!";
//   };

//   const getIcon = () => {
//     if (pathname.startsWith("/card")) return <LightyDeco />;
//   };

//   const setModalOpen = useSetRecoilState(getModalStateAtom());

//   return (
//       <BottomSheetOpenButton

//       />

//   );
// }
