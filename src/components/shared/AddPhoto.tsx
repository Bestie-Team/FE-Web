import { useState } from "react";
import { PlusCircleButtonSmall } from "./buttons/PlusCircleButton";
import Image from "next/image";

export default function AddPhoto({ small }: { small?: boolean }) {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label
      style={{
        width: small ? `72px` : "84px",
      }}
      htmlFor="fileInput"
    >
      <div
        style={{
          width: small ? `72px` : "84px",
          height: small ? `72px` : "84px",
          padding: small ? "4px" : "4.67px",
        }}
        className={uploadContainerStyle}
      >
        <div
          style={{
            width: small ? `64px` : "74.67px",
            height: small ? `64px` : "74.67px",
          }}
          className={imageWrapperStyle}
        >
          {image && (
            <Image
              src={image}
              alt="upload_image"
              width={small ? 64 : 74.67}
              height={small ? 64 : 74.67}
              className="object-cover"
            />
          )}
          <PhotoIcon />
        </div>
        <PlusCircleButtonSmall
          style={{
            bottom: small ? `2px` : "4.33px",
            right: small ? `2px` : "4.33px",
          }}
          className="absolute bottom-[4.33px] right-[4.33px]"
        />
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </label>
  );
}
function PhotoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Icon"
          d="M3.41789 18.6054C3.02737 18.9959 3.02737 19.6291 3.41789 20.0196C3.80842 20.4101 4.44158 20.4101 4.83211 20.0196L3.41789 18.6054ZM8.625 14.8125L9.33211 14.1054C8.94158 13.7149 8.30842 13.7149 7.91789 14.1054L8.625 14.8125ZM10.875 17.0625L10.1679 17.7696C10.5584 18.1601 11.1916 18.1601 11.5821 17.7696L10.875 17.0625ZM15.9375 12L16.6446 11.2929C16.2541 10.9024 15.6209 10.9024 15.2304 11.2929L15.9375 12ZM19.7304 17.2071C20.1209 17.5976 20.7541 17.5976 21.1446 17.2071C21.5351 16.8166 21.5351 16.1834 21.1446 15.7929L19.7304 17.2071ZM4.83211 20.0196L9.33211 15.5196L7.91789 14.1054L3.41789 18.6054L4.83211 20.0196ZM7.91789 15.5196L10.1679 17.7696L11.5821 16.3554L9.33211 14.1054L7.91789 15.5196ZM11.5821 17.7696L16.6446 12.7071L15.2304 11.2929L10.1679 16.3554L11.5821 17.7696ZM15.2304 12.7071L19.7304 17.2071L21.1446 15.7929L16.6446 11.2929L15.2304 12.7071ZM6.375 4H17.625V2H6.375V4ZM20 6.375V17.625H22V6.375H20ZM17.625 20H6.375V22H17.625V20ZM4 17.625V6.375H2V17.625H4ZM6.375 20C5.06332 20 4 18.9367 4 17.625H2C2 20.0412 3.95875 22 6.375 22V20ZM20 17.625C20 18.9367 18.9367 20 17.625 20V22C20.0412 22 22 20.0412 22 17.625H20ZM17.625 4C18.9367 4 20 5.06332 20 6.375H22C22 3.95875 20.0412 2 17.625 2V4ZM6.375 2C3.95875 2 2 3.95875 2 6.375H4C4 5.06332 5.06332 4 6.375 4V2ZM8.75 8.0625C8.75 8.4422 8.4422 8.75 8.0625 8.75V10.75C9.54677 10.75 10.75 9.54677 10.75 8.0625H8.75ZM8.0625 8.75C7.6828 8.75 7.375 8.4422 7.375 8.0625H5.375C5.375 9.54677 6.57823 10.75 8.0625 10.75V8.75ZM7.375 8.0625C7.375 7.6828 7.6828 7.375 8.0625 7.375V5.375C6.57823 5.375 5.375 6.57823 5.375 8.0625H7.375ZM8.0625 7.375C8.4422 7.375 8.75 7.6828 8.75 8.0625H10.75C10.75 6.57823 9.54677 5.375 8.0625 5.375V7.375Z"
          fill="#D8D8D8"
        />
      </g>
    </svg>
  );
}

const imageWrapperStyle =
  "flex justify-center items-center rounded-full bg-grayscale-50 overflow-hidden";

const uploadContainerStyle = "relative flex cursor-pointer";