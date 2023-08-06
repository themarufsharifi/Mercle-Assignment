export const format = (datestring) => {
  const date = new Date(datestring);
  const options = { month: "short", day: "numeric" };
  const formattedDate = date.toLocaleString(undefined, options);

  return formattedDate;
};
