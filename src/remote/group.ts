import { GroupInfo } from "@/models/group";

export async function getGroup({ id }: { id: string }) {
  const response = await fetch(`/groups/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to get group ${id}`);
  }

  return response.json();
}

export async function getGroups() {
  const response = await fetch(`/groups`);
  if (!response.ok) {
    throw new Error("Failed to get groups");
  }

  return response.json();
}

export async function postGroup({ group }: { group: GroupInfo }) {
  const response = await fetch(`/groups`, {
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

export async function deleteGroup(groupId: string) {
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
