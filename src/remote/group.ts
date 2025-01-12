import * as lighty from "lighty-type";

/** 그룹 생성 */
export async function getGroup({ id }: { id: string }) {
  const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups/id`;
  const response = await fetch(targetUrl);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to get group ${id}`);
  }

  return data;
}

export async function getGroups() {
  const response = await fetch(`/groups`);
  if (!response.ok) {
    throw new Error("Failed to get groups");
  }

  return response.json();
}

/** 그룹 생성 */
export async function postGroupCoverImage({ file }: { file: string }) {
  const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups/cover/image`;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(targetUrl, {
    method: "POST",
    body: formData,
  });

  const data: { imageUrl: string } = await response.json();

  if (!response.ok) {
    throw new Error("Failed to delete group member");
  }

  return data.imageUrl;
}

export async function postGroup({
  group,
}: {
  group: lighty.CreateGroupRequest;
}) {
  const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups`;

  const response = await fetch(targetUrl, {
    method: "POST",
    body: JSON.stringify(group),
  });

  if (!response.ok) {
    throw new Error("Failed to post group");
  }
  return response.json();
}

export async function addGroupMember({
  groupId,
  accountId,
}: {
  groupId: string;
  accountId: string;
}) {
  const response = await fetch(`/groups/${groupId}/members`, {
    method: "POST",
    body: JSON.stringify({ accountId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add group member");
  }
  return response.json();
}

export async function deleteGroup({ groupId }: { groupId: string }) {
  const response = await fetch(`/groups/${groupId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete group");
  }
  return response.json();
}

export async function deleteGroupMember({
  groupId,
  accountId,
}: {
  groupId: string;
  accountId: string;
}) {
  const response = await fetch(`/groups/${groupId}/members/${accountId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete group member");
  }
  return response.json();
}
