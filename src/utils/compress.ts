import imageCompression from "browser-image-compression";

export const compressImage = async (file: File, maxWidth?: number) => {
  const imageFile = file;
  const options = {
    maxSizeMB: 3,
    maxWidthOrHeight: maxWidth ? maxWidth : 1200,
    useWebWorker: true,
    quality: 1,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
};
