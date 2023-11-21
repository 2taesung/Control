interface Enable {
  enable: boolean;
}

type SortParam<T extends Enable> = {
  targetArr: Array<T>;
  keyArr: Array<keyof T>;
};

/** keyArr의 인덱스 순서대로 우선순위 정렬 */
export const layoredSort = <T extends Enable>({
  targetArr,
  keyArr,
}: SortParam<T>): Array<T> => {
  if (keyArr.length === 0) {
    return targetArr.map((item, index) => {
      return { ...item, id: index + 1 };
    });
  }

  return targetArr.sort((a, b) => {
    if (a.enable !== true && b.enable === true) {
      return 1; // b를 a보다 앞에 둔다
    }
    if (a.enable === true && b.enable !== true) {
      return -1; // a를 b보다 앞에 둔다
    }

    for (const key of keyArr) {
      if ((a as T)[key] < (b as T)[key]) return -1;
      if ((a as T)[key] > (b as T)[key]) return 1;
    }
    return 0;
  });
};
