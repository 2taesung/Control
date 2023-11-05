export const valueFilterByKey = <T>({
  datas,
  key,
  value,
}: {
  datas: Array<T>;
  key: keyof T;
  value: T[keyof T];
}): Array<T> => {
  return datas.filter(data => data[key] !== value);
};
