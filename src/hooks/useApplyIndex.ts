import { useEffect, useState } from 'react';

import { ScheduleItemT } from '@src/types';

export default function useApplyIndex({
  schedules,
  isApply,
}: {
  schedules: ScheduleItemT[];
  isApply: boolean;
}) {
  const [nowTime, setNowTime] = useState<Date | null>(null);
  const updateTime = () => {
    const now = new Date();
    setNowTime(now);
  };

  useEffect(() => {
    if (nowTime === null) {
      updateTime();
    }
  }, [nowTime]);

  setInterval(updateTime, 30000);

  if (isApply) {
    const [hour, min] = [
      Number(nowTime?.getHours()),
      Number(nowTime?.getMinutes()),
    ];

    const enabledSchedules = schedules.filter(
      schedule => schedule.enable === true,
    );

    if (enabledSchedules.length === 0) return -2;

    let targetIndex = 0;
    for (let i = 0; i < enabledSchedules.length; i++) {
      const target = enabledSchedules[i];
      if (target.startHour <= hour && target.startMin <= min) {
        targetIndex = i;
      }
    }

    return targetIndex;
  }

  return 0;
}
