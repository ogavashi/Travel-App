export const inRange = (range: string, value: number): boolean => {
  const rangeArray: number[] = range
    .split("_")
    .filter((r) => r !== "x")
    .map(Number);

  return rangeArray.length > 1
    ? value < rangeArray[1] && value >= rangeArray[0]
    : value >= rangeArray[0];
};
