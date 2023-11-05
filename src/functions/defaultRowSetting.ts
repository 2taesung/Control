import { DEFAULT_SCHEDULE } from '@src/constants/DEFAULTS';
import { ScheduleDataT, ScheduleItemT } from '@src/types';

export const defaultRowSetting = (data: ScheduleDataT): ScheduleDataT => {
  const isDefaultSetting = !!data?.schedule.filter(
    (item: ScheduleItemT) => item.id === 0,
  ).length;

  const newSchedule = isDefaultSetting
    ? data?.schedule
    : [DEFAULT_SCHEDULE, ...data?.schedule];

  return { ...data, schedule: newSchedule };
};
