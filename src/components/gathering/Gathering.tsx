import React from "react";
import GatheringCard from "./GatheringCard";
import clsx from "clsx";
import Message from "../shared/Message";

export default function Gathering({
  className,
  which,
}: {
  className?: string;
  which: string;
}) {
  const images = which === "1" ? allFeed : myFeed;

  return (
    <div className={clsx(styles.container, className)}>
      {which === "2" ? <Message /> : null}
      <div className="grid grid-cols-2 gap-4">
        {images.map((gathering) => (
          <GatheringCard
            imageUrl={images[0]}
            key={`${gathering}`}
            which={which}
          />
        ))}
      </div>
    </div>
  );
}

const myFeed = ["https://d1al3w8x2wydb3.cloudfront.net/images/IMG_7815.jpeg"];

const allFeed = [
  "https://d1al3w8x2wydb3.cloudfront.net/images/gathering.png",
  "https://d1al3w8x2wydb3.cloudfront.net/images/gathering.png",
  "https://d1al3w8x2wydb3.cloudfront.net/images/gathering.png",
  "https://d1al3w8x2wydb3.cloudfront.net/images/gathering.png",
];

const styles = {
  container: "pt-[155px] pb-[111px] animate-fadeIn w-full px-[20px]",
};
