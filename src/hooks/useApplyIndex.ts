import { useEffect, useState } from 'react';

export default function useApplyIndex({ schedules, isApply }) {
  const [nowTime, setNowTime] = useState(null);

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

  if (!schedules) return 0;
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
