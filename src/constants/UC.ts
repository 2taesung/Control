import { Apps, TargetControl } from '@src/types';

export const TYPE = 'valueData';

export const TARGETS_MAP: Record<Apps, TargetControl[]> = {
  uc: ['setTemp', 'setVentilateCtrlDefro'],
  hum: ['setHum'],
  ef: ['status'],
  hvac: ['setTemp', 'setHum'],
};
