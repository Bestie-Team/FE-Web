"use client";
import React, { FormEvent, useState } from "react";
// import useDebounce from "@/hooks/debounce";
import FRIENDS from "@/constants/friends";
import SearchInput from "../shared/inputs/SearchBar";
import Spacing from "../shared/Spacing";
import FriendsPageHeader from "./FriendsPageHeader";
import FriendListItem from "./FriendListItem";
import Flex from "../shared/Flex";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import Modal from "../shared/modal";
import { selectedFriendsAtom } from "@/atoms/friends";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { gatheringModalStateAtom } from "@/atoms/gathering";
import { MemberInfo } from "@/constants/members";

// /api/search/${keyword}
// 검색하는 keyword가 있다면 /api/search/${keyword} -> 유저네임이나, 네임
// 검색하는 keyword가 없다면 /api/search -> 전체 유저

export default function FriendSearchSelectContainer() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(gatheringModalStateAtom);
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const setSelectedFriends =
    useSetRecoilState<MemberInfo[]>(selectedFriendsAtom);
  // const debouncedKeyword = useDebounce(keyword);
  //   const {
  //     data: users,
  //     isLoading,
  //     error,
  //   } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
  const users = FRIENDS;
  const router = useRouter();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const toggleItemClick = (idx: number) => {
    setClickedItems((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  const handleSubmitClickedFriends = () => {
    const clickedFriends = clickedItems.map((idx) => users[idx]);
    setSelectedFriends(clickedFriends);
    router.back();
  };

  return (
    <>
      <div className="max-w-[430px] fixed w-full z-10 bg-grayscale-50">
        <FriendsPageHeader label="초대할 친구" addFriendIcon={false} />
        <form className="px-[20px]" onSubmit={onSubmit}>
          <Spacing size={20} />
          <SearchInput
            className="!bg-base-white"
            placeholder="이름/아이디로 검색하기"
          />
        </form>
        <Spacing size={16} />
      </div>
      {/* {error && <p className="p-4">무언가가 잘못 되었음</p>}
      {isLoading && (
        <div className="p-4">
          <GridSpinner />
        </div>
      )}
      {!isLoading && !error && users?.length === 0 && (
        <p className="p-4">찾는 사용자가 없음 😇</p>
      )} */}
      {users?.length === 0 && <p className="p-4">찾는 사용자가 없음 😇</p>}
      <Flex
        direction="column"
        style={{
          backgroundColor: "#F4F4F4",
          paddingTop: "140px",
          paddingBottom: "72px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <span className="text-T5">{`친구 ${users.length}`}</span>
        <Spacing size={12} />
        <ul>
          {users &&
            users.map((user, index) => (
              <React.Fragment key={`${user.userId}${index}`}>
                <FriendListItem
                  friendInfo={user}
                  idx={index}
                  type="basic"
                  onClick={() => {
                    toggleItemClick(index);
                  }}
                  clicked={clickedItems.includes(index)}
                />
                <Spacing size={16} />
              </React.Fragment>
            ))}
        </ul>
        <FixedBottomButton
          label={`${clickedItems.length}명 선택 완료`}
          disabled={clickedItems.length < 1}
          onClick={handleSubmitClickedFriends}
        />
        {isModalOpen ? (
          <Modal
            onClose={() => {
              setIsModalOpen(false);
            }}
          />
        ) : null}
      </Flex>
    </>
  );
}
