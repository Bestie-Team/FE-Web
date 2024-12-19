import React, { useState } from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import FriendItem, { AddFriendItem } from "../home/FriendItem";

export default function AddFriendsSlider() {
  const [images, setImages] = useState<string[]>([""]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as ArrayLike<File>);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };
  return (
    <div className="w-full">
      <Spacing size={16} />
      <Flex className="overflow-scroll no-scrollbar">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            multiple
          />
          <AddFriendItem />
        </label>
        {images.map((_, i) => {
          return (
            <React.Fragment key={`friendItem${i}`}>
              <FriendItem />
              <Spacing size={4} direction="horizontal" />
            </React.Fragment>
          );
        })}
      </Flex>
    </div>
  );
}
