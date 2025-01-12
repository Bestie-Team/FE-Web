import { GatheringInfo } from "@/models/gathering";
import makeUTC from "@/utils/makeUTC";

export async function postGathering({
  gathering,
}: {
  gathering: GatheringInfo;
}) {
  const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/gatherings`;
  const concatDate = makeUTC({
    ampm: gathering.ampm,
    date: gathering.date,
    time: gathering.time,
  });

  const newGathering = { ...gathering, gatheringDate: concatDate };

  const response = await fetch(targetUrl, {
    method: "POST",
    body: JSON.stringify(newGathering),
  });

  if (!response.ok) {
    throw new Error(`모임 생성에 실패하였습니다`);
  }

  return response.json();
}

export async function postGatheringInvitationImage({ file }: { file: string }) {
  const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/gatherings/invitation/image`;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(targetUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`모임 초대장 이미지 업로드에 실패하였습니다.`);
  }

  const data: { imageUrl: string } = await response.json();

  return data.imageUrl;
}

export async function postAcceptGatheringInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/gatherings/${invitationId}/accept`;

  const response = await fetch(targetUrl, {
    method: "POST",
  });
  if (response.ok) {
    alert("모임을 수락하였습니다.");
    return;
  }
  if (response.status === 400) {
    throw new Error(`입력값 검증 실패`);
  }
  if (!response.ok) {
    throw new Error(`모임 수락 실패`);
  }

  return;
}

export async function postRejectGatheringInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/gatherings/${invitationId}/reject`;

  const response = await fetch(targetUrl, {
    method: "POST",
  });
  if (response.ok) {
    alert("모임을 거절하였습니다.");
    return;
  }
  if (response.status === 400) {
    throw new Error(`입력값 검증 실패`);
  }
  if (!response.ok) {
    throw new Error(`모임 거절 실패`);
  }

  return;
}
