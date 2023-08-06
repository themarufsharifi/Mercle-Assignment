export const getMillisecondsOfEveryHour = (date, count) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const millisecondsOfEveryHour = [];

  for (let i = 0; i < 24; i++) {
    const currentHour = new Date(startOfDay);
    currentHour.setHours(i);
    millisecondsOfEveryHour.push([currentHour.getTime(), count]);
  }

  return millisecondsOfEveryHour;
};
