import { ScheduleT } from '@src/types';

export const testSchedules: ScheduleT = [
  {
    classId: 'hvacTempHumSchedule',
    id: 1,
    enable: true,
    startHour: 8,
    startMin: 0,
    temp: 17,
    hum: 80,
  },
  {
    classId: 'hvacTempHumSchedule',
    id: 2,
    enable: true,
    startHour: 18,
    startMin: 0,
    temp: 20,
    hum: 90,
  },
];
