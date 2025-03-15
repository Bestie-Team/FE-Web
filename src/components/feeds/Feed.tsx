// import FeedCard from "@/components/feeds/FeedCard";
// import { Feed } from "@/models/feed";
// import clsx from "clsx";
// import { Dispatch, SetStateAction } from "react";
// import Spacing from "../shared/Spacing";
// import { FeedSkeleton } from "../shared/Skeleton/FeedSkeleton";
// import InfoBar, { FriendsInfoContainer } from "./InfoBar";
// import OptionsSelectIcon from "../shared/Icon/OptionsSelectIcon";
// import { MENU_CONFIGS } from "./FeedOption";
// import { useDropdown } from "@/hooks/useDropdown";

// export type FeedType = "나의피드" | "전체";

// export default function MyFeed({
//   feeds,
//   onClickFeed,
//   className,
//   isFetching,
// }: {
//   feeds: Feed[];
//   onClickFeed: Dispatch<SetStateAction<string>>;
//   className?: string;
//   isFetching: boolean;
// }) {
//   const { btnRef, toggleDropdown, openedDropdownId, ref, closeDropdown } =
//     useDropdown();

//   return (
//     <div className={clsx("pt-safe-top", className)}>
//       {feeds.map((feed) => (
//         <div key={feed.id} className="relative">
//           <FeedCard feed={feed} onClick={setSelectedFeedId}>
//             <InfoBar
//               ref={boxRef}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleBox(feed.id);
//               }}
//               withMembers={feed.withMembers}
//               feed={feed}
//             />
//             <div className="absolute top-11 right-14" ref={c_ref}>
//               {openedBoxId == feed.id && (
//                 <FriendsInfoContainer
//                   withMembers={feed.withMembers}
//                   isOpen={openedBoxId === feed.id}
//                 />
//               )}
//             </div>
//           </FeedCard>
//           <div
//             ref={btnRef}
//             onClick={(e) => {
//               e.stopPropagation();
//               toggleDropdown(feed.id);
//             }}
//             style={{ width: 24, height: 24 }}
//             className={styles.optionWrapper}
//           >
//             <OptionsSelectIcon />
//             {openedDropdownId === feed.id && (
//               <FeedDropdownMenuq
//                 feed={feed}
//                 ref={ref}
//                 menuItems={MENU_CONFIGS["hidden"].menuItems}
//                 className={MENU_CONFIGS["hidden"].className}
//               />
//             )}
//           </div>
//         </div>
//       ))}
//       <Spacing size={50} />
//       {isFetching && <FeedSkeleton />}
//     </div>
//   );
// }
