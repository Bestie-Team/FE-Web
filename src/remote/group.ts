export async function getGroup(id: string) {
  const response = await fetch(`/그룹정보를가져오는API${id}`);
  return response;
}
