import React, { useMemo, useState } from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendItem, { AddFriendItem, SeeMoreItem } from "./FriendItem";
import { useRouter } from "next/navigation";
import { useFriendsAll } from "../friends/hooks/useFriends";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";

export default function FriendsSlider() {
  const router = useRouter();
  const [hide, setHide] = useState(true);

  const { data = [], isFetching } = useFriendsAll();

  const displayedFriends = useMemo(
    () => (hide ? data.slice(0, 12) : data),
    [data, hide]
  );

  const renderFriends = () =>
    displayedFriends.map((friend, i) => (
      <React.Fragment key={`friendItem${i}`}>
        <FriendItem friendInfo={friend} />
        <Spacing size={4} direction="horizontal" />
      </React.Fragment>
    ));

  return (
    <div className="w-max-[430px] pl-5 overflow-scroll no-scrollbar">
      <Spacing size={16} />
      {isFetching ? (
        <DotSpinnerSmall />
      ) : (
        <Flex>
          <AddFriendItem
            onClick={() => {
              router.push("/friends/search");
            }}
          />
          {renderFriends()}
          {data.length > 12 ? (
            <SeeMoreItem
              onClick={() => {
                setHide(false);
              }}
            />
          ) : null}
        </Flex>
      )}
    </div>
  );
}
