import STORAGE_KEYS from "@/constants/storageKeys";
import { validateAuth, validateBackendUrl } from "./shared";

export async function handleProfileImageUpdate(imageFile: { file: File }) {
  try {
    const imageUrl = await postProfileImage(imageFile);
    if (imageUrl) {
      const isPatched = await patchProfileImage({ profileImageUrl: imageUrl });
      if (isPatched) {
        return { message: "프로필 이미지가 정상적으로 업로드 되었습니다." };
      }
    }
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "이미지 업로드 요청에 실패했습니다."
    );
  }
}

export async function postProfileImage(imageFile: { file: File }) {
  try {
    const backendUrl = validateBackendUrl();
    const token = validateAuth();

    if (!imageFile || !imageFile.file) {
      throw new Error("이미지 파일을 선택해주세요.");
    }
    const formData = new FormData();
    formData.append("file", imageFile.file);

    const targetUrl = `${backendUrl}/users/profile/image`;

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "이미지 업로드 중 문제가 발생했습니다.");
    }

    const data: { imageUrl: string } = await response.json();

    if (response.ok) {
      localStorage.setItem(STORAGE_KEYS.PROFILE_IMAGE_URL, data.imageUrl);

      return data.imageUrl;
    }
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "프로필 이미지 업로드중 문제 발생"
    );
  }
}

export async function patchProfileImage(imageUrl: { profileImageUrl: string }) {
  try {
    const backendUrl = validateBackendUrl();
    const token = validateAuth();

    const targetUrl = `${backendUrl}/users/profile/image`;

    const response = await fetch(targetUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ profileImageUrl: imageUrl.profileImageUrl }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText || "프로필 이미지 업데이트 중 문제가 발생했습니다."
      );
    }
    console.log("프로필 이미지가 성공적으로 업데이트되었습니다.");
    return true;
  } catch (error) {
    console.error("Error during updating profile image:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "프로필 이미지 업데이트 요청에 실패했습니다."
    );
  }
}
