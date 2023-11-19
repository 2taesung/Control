import { ScheduleItemT, ScheduleT } from '@src/types';

type ScheduleParams = {
  id: number;
  fields: string[];
};

function createSchedule({ id, fields }: ScheduleParams) {
  const schedule: ScheduleItemT = {
    id,
    enable: false,
    startHour: 0,
    startMin: 0,
  };

  if (fields.includes('temp')) {
    schedule.temp = 8;
  }

  if (fields.includes('hum')) {
    schedule.hum = 70;
  }

  if (fields.includes('status')) {
    schedule.status = false;
  }

  return schedule;
}

type SchedulesParams = {
  count: number;
  fields: string[];
};

function createSchedules({ count, fields }: SchedulesParams): ScheduleT {
  return Array.from({ length: count }, (_, i) =>
    createSchedule({ id: i + 1, fields }),
  );
}

export const DEFAULT_SCHEDULES_MAP = new Map([
  ['hvac', createSchedules({ count: 12, fields: ['temp', 'hum', 'status'] })],
  ['uc', createSchedules({ count: 12, fields: ['temp'] })],
  ['hum', createSchedules({ count: 12, fields: ['hum'] })],
  ['ef', createSchedules({ count: 12, fields: ['status'] })],
]);
