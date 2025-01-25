import Flex from "../shared/Flex";
import CalendarLightyIcon from "../shared/Icon/CalendarLightyIcon";

export default function DateItem({
  day,
  date,
  icon,
}: {
  day: string;
  date: number;
  icon?: boolean;
}) {
  return (
    <Flex direction="column" align="center" className={styles.container}>
      <div className={styles.day}>{day}</div>
      <div className={styles.date}>{date}</div>
      {icon ? (
        <div>
          <CalendarLightyIcon />
        </div>
      ) : null}
    </Flex>
  );
}

const styles = {
  container: "w-[32px] pb-[4px]",

  day: "text-B3 text-grayscale-600 pl-[9px] pr-2 pt-[3px] pb-[7px]",
  date: "text-center text-T5 w-8 h-8 py-[7px]",
};
