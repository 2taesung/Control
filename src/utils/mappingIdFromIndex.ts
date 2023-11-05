export const mappingIdFromIndex = <T>({
  arr,
}: {
  arr: Array<T>;
}): Array<T & { id: number }> => {
  return arr.map((item, index) => {
    return { ...item, id: index + 1 };
  });
};
