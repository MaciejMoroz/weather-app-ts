export const isStringOfLength = (
  string: string,
  min: number,
  max: number
): boolean => {
  if (string.length >= min && string.length <= max) {
    return true;
  } else {
    return false;
  }
};
