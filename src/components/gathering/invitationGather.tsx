/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import Image from "next/image";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import GroupImages from "../shared/GroupImages";
import MapPinIcon from "../shared/icons/MapPinIcon";
import CalendarIcon from "../shared/icons/CalendarIcon";
import CloseIcon from "../shared/icons/CloseIcon";

export default function InvitationGather({
  selectedImage,
  setSelectedImage,
  openVal,
}) {
  const [open, setOpen] = useState(openVal);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const onClickClose = (args: boolean) => {
    setOpen(args);
  };

  return (
    <div className="flex justify-center items-center">
      {open && (
        <div>
          <Flex
            direction="column"
            justify="center"
            align="center"
            style={{ width: "330px" }}
          >
            <CloseIcon
              width="32"
              height="32"
              className="self-end cursor-pointer"
              onClick={() => {
                onClickClose(false);
              }}
            />
            <Spacing size={8} />
            <div className="relative">
              <Image
                src="https://d20j4cey9ep9gv.cloudfront.net/invitationV.png"
                alt="invitationVertical"
                width={330}
                height={460}
              />
              <Flex
                direction="column"
                style={{
                  position: "absolute",
                  padding: "15px",
                  left: 0,
                  top: 0,
                }}
              >
                <div className="w-full h-[210px] relative flex justify-center items-center">
                  <div
                    className="w-[300px] h-[210px] bg-[#f4f4f4] rounded-xl cursor-pointer overflow-hidden"
                    onClick={handleImageClick}
                  >
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <g id="icon">
                            <path
                              id="Icon"
                              d="M4.55719 24.8072C4.03649 25.3279 4.03649 26.1721 4.55719 26.6928C5.07789 27.2135 5.92211 27.2135 6.44281 26.6928L4.55719 24.8072ZM11.5 19.75L12.4428 18.8072C11.9221 18.2865 11.0779 18.2865 10.5572 18.8072L11.5 19.75ZM14.5 22.75L13.5572 23.6928C14.0779 24.2135 14.9221 24.2135 15.4428 23.6928L14.5 22.75ZM21.25 16L22.1928 15.0572C21.6721 14.5365 20.8279 14.5365 20.3072 15.0572L21.25 16ZM26.3072 22.9428C26.8279 23.4635 27.6721 23.4635 28.1928 22.9428C28.7135 22.4221 28.7135 21.5779 28.1928 21.0572L26.3072 22.9428ZM6.44281 26.6928L12.4428 20.6928L10.5572 18.8072L4.55719 24.8072L6.44281 26.6928ZM10.5572 20.6928L13.5572 23.6928L15.4428 21.8072L12.4428 18.8072L10.5572 20.6928ZM15.4428 23.6928L22.1928 16.9428L20.3072 15.0572L13.5572 21.8072L15.4428 23.6928ZM20.3072 16.9428L26.3072 22.9428L28.1928 21.0572L22.1928 15.0572L20.3072 16.9428ZM8.5 5.33333H23.5V2.66667H8.5V5.33333ZM26.6667 8.5V23.5H29.3333V8.5H26.6667ZM23.5 26.6667H8.5V29.3333H23.5V26.6667ZM5.33333 23.5V8.5H2.66667V23.5H5.33333ZM8.5 26.6667C6.7511 26.6667 5.33333 25.2489 5.33333 23.5H2.66667C2.66667 26.7217 5.27834 29.3333 8.5 29.3333V26.6667ZM26.6667 23.5C26.6667 25.2489 25.2489 26.6667 23.5 26.6667V29.3333C26.7217 29.3333 29.3333 26.7217 29.3333 23.5H26.6667ZM23.5 5.33333C25.2489 5.33333 26.6667 6.7511 26.6667 8.5H29.3333C29.3333 5.27834 26.7217 2.66667 23.5 2.66667V5.33333ZM8.5 2.66667C5.27834 2.66667 2.66667 5.27834 2.66667 8.5H5.33333C5.33333 6.7511 6.7511 5.33333 8.5 5.33333V2.66667ZM11.6667 10.75C11.6667 11.2563 11.2563 11.6667 10.75 11.6667V14.3333C12.729 14.3333 14.3333 12.729 14.3333 10.75H11.6667ZM10.75 11.6667C10.2437 11.6667 9.83333 11.2563 9.83333 10.75H7.16667C7.16667 12.729 8.77098 14.3333 10.75 14.3333V11.6667ZM9.83333 10.75C9.83333 10.2437 10.2437 9.83333 10.75 9.83333V7.16667C8.77098 7.16667 7.16667 8.77098 7.16667 10.75H9.83333ZM10.75 9.83333C11.2563 9.83333 11.6667 10.2437 11.6667 10.75H14.3333C14.3333 8.77098 12.729 7.16667 10.75 7.16667V9.83333Z"
                              fill="#D8D8D8"
                            />
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <Spacing size={10} />
                <span className="text-T1 pl-[4px]">christmas party</span>
                <span className="text-B4 pl-[4px] text-grayscale-600">
                  먹고 죽는 크리스마스 돼지 파티에 초대합니다.
                </span>
              </Flex>
              <Flex
                direction="column"
                style={{
                  position: "absolute",
                  paddingLeft: "4px",
                  left: "15px",
                  top: "332px",
                }}
              >
                <Flex align="center">
                  <CalendarIcon width="14" height="14" color="#AEAEAE" />
                  <Spacing direction="horizontal" size={8} />
                  <span className="text-B4">christmas party</span>
                  <Spacing direction="horizontal" size={8} />
                  <span className="text-B4">오후 6:00</span>
                </Flex>
                <Flex align="center">
                  <MapPinIcon />
                  <Spacing direction="horizontal" size={8} />
                  <span className="text-B4">성수 에이바</span>
                </Flex>
              </Flex>
              <div className="absolute bottom-[15px] left-[15px] pl-[4px]">
                <GroupImages width={34} height={34} gap={6} />
              </div>
              <Flex
                align="center"
                style={{
                  position: "absolute",
                  paddingRight: "4px",
                  right: "15px",
                  bottom: "22px",
                }}
              >
                <span className="text-T5 text-grayscale-300">from</span>
                <Spacing direction="horizontal" size={4} />
                <span className="text-B3">Maybin_</span>
              </Flex>
            </div>
            <Spacing size={16} />
          </Flex>
        </div>
      )}
    </div>
  );
}
