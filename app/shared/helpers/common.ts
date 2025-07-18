export const generateUniqueUserId = () => {
  const unixDatePart = Math.floor(Date.now() / 1000);
  const randomPart = String(
    Math.floor(Math.random() * 1_000_000_0000),
  ).padStart(10, "0");

  return `${unixDatePart}${randomPart}`;
};
