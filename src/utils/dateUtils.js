exports.getDateNDaysAgo = (n) => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date;
};