import { TableHeadsT } from '@src/types';

export const valueRange: {
  [key in TableHeadsT]: { min: number; max: number };
} = {
  id: {
    min: 0,
    max: 100,
  },
  enable: {
    min: 0,
    max: 100,
  },
  startHour: {
    min: 0,
    max: 24,
  },
  startMin: {
    min: 0,
    max: 60,
  },
  temp: {
    min: 10,
    max: 30,
  },
  hum: {
    min: 60,
    max: 100,
  },
  apply: {
    min: 0,
    max: 100,
  },
  status: {
    min: 0,
    max: 100,
  },
  onOff: {
    min: 0,
    max: 100,
  },
};
