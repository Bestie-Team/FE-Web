import { subHours } from "date-fns";
import { format, addHours } from "date-fns";
import { ko } from "date-fns/locale";

export default function makeUTC({
  ampm,
  date,
  time,
}: {
  ampm: string;
  date: string;
  time: string;
}) {
  const [hour, minute] = time.split(":").map((part) => part.padStart(2, "0"));

  let formattedHour = parseInt(hour);
  if (ampm === "오후" && formattedHour !== 12) {
    formattedHour += 12;
  } else if (ampm === "오전" && formattedHour === 12) {
    formattedHour = 0;
  }

  const formattedHourStr = formattedHour.toString().padStart(2, "0");

  const kstDateTime = new Date(
    `${date}T${formattedHourStr}:${minute}:00+09:00`
  );

  if (isNaN(kstDateTime.getTime())) {
    throw new Error("Invalid date or time format");
  }

  const utcDateTime = subHours(kstDateTime, 9);
  return utcDateTime.toISOString();
}

export function formatToKoreanTime(utcISOString: string) {
  const formattedDate = format(
    addHours(new Date(utcISOString), 9),
    "yyyy-MM-dd a hh:mm",
    { locale: ko }
  );

  return formattedDate;
}

export function formatToDisplay(utcISOString: string) {
  const formattedDate = format(
    addHours(new Date(utcISOString), 9),
    "yyyy.MM.dd (E) a h:mm",
    { locale: ko }
  );

  return formattedDate;
}
