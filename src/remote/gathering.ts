import { GatheringInfo } from "@/models/gathering";

export async function getGatherings() {
  const response = await fetch(`/gatherings`);
  if (!response.ok) {
    throw new Error(`Failed to get gatherings`);
  }

  return response.json();
}

export async function postGathering({
  gathering,
}: {
  gathering: GatheringInfo;
}) {
  const concatDate =
    gathering.ampm === "오전"
      ? gathering.date + "T" + gathering.time + ":00.000Z"
      : gathering.date +
        "T" +
        (parseInt(gathering.time.split(":")[0]) + 12) +
        ":" +
        gathering.time.split(":")[1] +
        ":00.000Z";

  const newGathering = { ...gathering, gatheringDate: concatDate };

  const response = await fetch(`/gathering`, {
    method: "POST",
    body: JSON.stringify(newGathering),
  });

  if (!response.ok) {
    throw new Error(`Failed to get gatherings`);
  }

  return response.json();
}
