export default function makeUTC({
  ampm,
  date,
  time,
}: {
  ampm: string;
  date: string;
  time: string;
}) {
  const concatDate =
    ampm === "오전"
      ? date + "T" + time + ":00.000Z"
      : date +
        "T" +
        (parseInt(time.split(":")[0]) + 12) +
        ":" +
        time.split(":")[1] +
        ":00.000Z";
  return concatDate;
}
