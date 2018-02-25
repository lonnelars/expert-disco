export const padLeft = (s: string, padding: number): string => {
  if (padding === 0) {
    return s;
  } else {
    return padLeft(" " + s, padding - 1);
  }
};
