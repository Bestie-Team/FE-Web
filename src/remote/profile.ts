export async function handleProfileImageUpdate(imageFile: { file: File }) {
  try {
    const imageUrl = await postProfileImage(imageFile);

    if (imageUrl) {
      const isPatched = await patchProfileImage({ profileImageUrl: imageUrl });

      if (isPatched) {
        console.log("프로필 이미지가 정상적으로 업로드 되었습니다.");
      }
    }
  } catch (error) {
    console.error("프로필 이미지 업로드중 에러가 발생하였습니다:", error);
  }
}

export async function postProfileImage(imageFile: { file: File }) {
  try {
    if (!imageFile || !imageFile.file) {
      throw new Error("이미지 파일을 선택해주세요.");
    }

    const formData = new FormData();
    formData.append("file", imageFile.file);

    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("백엔드 URL이 설정되지 않았습니다.");
    }

    const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile/image`;

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
      localStorage.setItem("profile_image_url", data.imageUrl);

      alert("프로필 이미지가 성공적으로 업로드되었습니다.");

      window.location.href = "/home";
      return data.imageUrl;
    } else {
      alert("이미지 업로드 중 문제가 발생했습니다.");
    }
  } catch (error) {
    console.error("Error during uploading Image:", error);
    alert("이미지 업로드 요청에 실패했습니다.");
  }
}

export async function patchProfileImage(imageUrl: { profileImageUrl: string }) {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("백엔드 URL이 설정되지 않았습니다.");
    }

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

    alert("프로필 이미지가 성공적으로 업데이트되었습니다.");
    return true;
  } catch (error) {
    console.error("Error during updating profile image:", error);
    alert(
      error instanceof Error
        ? error.message
        : "프로필 이미지 업데이트 요청에 실패했습니다."
    );
    return false;
  }
}
