import { API_CONFIG, fetchWithAuth } from "./shared";

export async function postProfileImageWithToken({
  file,
  token,
}: {
  file: File;
  token: string;
}) {
  try {
    const baseUrl = API_CONFIG.getBaseUrl();
    const targetUrl = `${baseUrl}/users/profile/image`;

    if (!file || !file) {
      throw new Error("이미지 파일을 선택해주세요");
    }
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(targetUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    });
    const data: { imageUrl: string } = await response.json();
    return { imageUrl: data.imageUrl };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "프로필 이미지 업로드중 문제 발생"
    );
  }
}

export async function postProfileImage({ file }: { file: File }) {
  try {
    const baseUrl = API_CONFIG.getBaseUrl();
    const targetUrl = `${baseUrl}/users/profile/image`;

    if (!file || !file) {
      throw new Error("이미지 파일을 선택해주세요");
    }
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetchWithAuth(targetUrl, {
      method: "POST",
      body: formData,
    });

    const data: { imageUrl: string } = await response.json();
    return { imageUrl: data.imageUrl };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "프로필 이미지 업로드중 문제 발생"
    );
  }
}

export async function patchProfileImage(profileImageUrl: string) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/users/profile/image`;

    await fetchWithAuth(targetUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileImageUrl }),
    });

    return { message: "프로필 이미지가 성공적으로 업데이트되었습니다" };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "프로필 이미지 업데이트 요청에 실패했습니다"
    );
  }
}

export async function patchProfileImageWithToken({
  profileImageUrl,
  token,
}: {
  profileImageUrl: string;
  token: string;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/users/profile/image`;

    await fetchWithAuth(targetUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ profileImageUrl }),
    });

    return { message: "프로필 이미지가 성공적으로 업데이트되었습니다" };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "프로필 이미지 업데이트 요청에 실패했습니다"
    );
  }
}

export async function patchProfileAccountId(accountId: { accountId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/users/account-id`;

    await fetchWithAuth(targetUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountId),
    });

    return { message: "프로필이 성공적으로 업데이트되었습니다" };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "프로필 이미지 업데이트 요청에 실패했습니다"
    );
  }
}

export async function updateProfileImage(imageFile: { file: File }) {
  try {
    const { imageUrl } = await postProfileImage({ file: imageFile.file });
    console.log("Image uploaded successfully:", imageUrl);

    const updateResponse = await patchProfileImage(imageUrl);
    console.log(updateResponse.message);

    return {
      success: true,
      message: "프로필 이미지가 성공적으로 업로드 및 업데이트되었습니다",
      imageUrl,
    };
  } catch (error) {
    console.error("Error during profile image update process:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "프로필 이미지 업로드 및 업데이트 중 문제가 발생했습니다"
    );
  }
}
