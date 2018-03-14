export const padLeft = (s, padding) => {
  if (padding === 0) {
    return s;
  } else {
    return padLeft(" " + s, padding - 1);
  }
}