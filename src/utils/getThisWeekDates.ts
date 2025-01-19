export const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // 일요일 보정

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek); // 매번 새로운 날짜 객체 생성
    date.setDate(startOfWeek.getDate() + i);
    weekDays.push(date);
  }

  return weekDays;
};
