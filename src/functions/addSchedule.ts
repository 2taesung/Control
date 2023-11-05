import { postScheduleData } from '@src/api/schedules';
import { Apps, ScheduleT, resScheduleT } from '@src/types';

const TYPE = 'scheduleData';

type AddSchedulParams = {
  app: Apps;
  targetMachineNum: string;
  scheduleData: resScheduleT;
  schedule: ScheduleT;
};

export const addSchedule = async ({
  app,
  targetMachineNum,
  scheduleData,
  schedule,
}: AddSchedulParams) => {
  const { site, sector } = scheduleData;
  const newData = {
    target: ['schedule'],
    site,
    sector,
    type: TYPE,
    targetMachine: `${app}_${targetMachineNum}`,
    scheduleLength: schedule.length,
    schedule: schedule,
  };

  await postScheduleData({ app, newData });
};
