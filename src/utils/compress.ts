import imageCompression from "browser-image-compression";

export const compressImage = async (file: File, maxWidth?: number) => {
  const imageFile = file;
  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: maxWidth ? maxWidth : 500,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
};
