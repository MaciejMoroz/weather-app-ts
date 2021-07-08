export const DateToString = (date: Date) => {
  const yr = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth();
  return `
    ${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${yr}`;
};
