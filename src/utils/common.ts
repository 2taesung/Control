/* eslint-disable @typescript-eslint/no-explicit-any */

import { OnChangeTargetTransformer } from '@src/types';

type AnyObject = Record<string | number | symbol, any>;
/**
 * 객체 특정 key 값들 제외후 객체 반환
 * */
export const omitKeys = <T extends AnyObject, K extends keyof T>(
  obj: T,
  keysToOmit: K[],
): Omit<T, K> => {
  return Object.keys(obj).reduce((newObj, key) => {
    if (!keysToOmit.includes(key as K)) {
      newObj[key as keyof T] = obj[key];
    }
    return newObj;
  }, {} as T);
};

/**
 * 특정 조건 확인후 참이라면 밸류 반환
 * */
export const conditionalReturn = <T, K>(
  condition: T,
  returnValue: K,
): false | K => !!condition && returnValue;

export const checkboxTransformer: OnChangeTargetTransformer = value =>
  Boolean(value.checked);
export const numberTransformer: OnChangeTargetTransformer = value =>
  Number(value.value);

export const noop = () => void 0;
