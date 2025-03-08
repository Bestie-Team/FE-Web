// import React from "react";
// import FriendsListContainer from "./FriendsListContainer";
// import useSearchFriends from "./hooks/useSearchFriends";
// import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
// import useInfiniteScroll from "@/hooks/useInfiniteScroll";

// export default function SearchedFriendsListContainer({
//   debouncedSearch,
// }: {
//   debouncedSearch: string;
// }) {
//   const { data, isFetching, loadMore } = useSearchFriends({
//     search: debouncedSearch,
//     enabled: debouncedSearch.length >= 2,
//   });

//   useInfiniteScroll({ isFetching, loadMore });

//   if (isFetching) return <DotSpinnerSmall />;

//   return <FriendsListContainer friends={data} />;
// }
