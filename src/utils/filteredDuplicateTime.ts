import { ScheduleItemT, ScheduleT } from '@src/types';

type UniqueTimeEntries = {
  [key: string]: ScheduleItemT;
};

export const filteredDuplicateTime = (schedule: ScheduleT) => {
  if (!Array.isArray(schedule)) return [];
  // Create an empty object to store unique time entries
  const uniqueTimeEntries: UniqueTimeEntries = {};

  // Initialize an empty array to store the filtered schedule
  const filteredSchedule = [];

  // Iterate through the array
  for (const entry of schedule) {
    // Create a key based on 'startHour' and 'startMin'
    const timeKey = `${entry.startHour}:${entry.startMin}`;

    // If both 'startHour' and 'startMin' are 0, add the entry and continue
    if (entry.startHour === 0 && entry.startMin === 0) {
      filteredSchedule.push(entry);
      continue;
    }

    // If the time key is not in the uniqueTimeEntries, add it
    if (!uniqueTimeEntries.hasOwnProperty(timeKey)) {
      uniqueTimeEntries[timeKey] = entry;
      filteredSchedule.push(entry);
    }
  }

  // Add filler data to maintain the length of 12
  const fillerCount = 12 - filteredSchedule.length;
  for (let i = 0; i < fillerCount; i++) {
    const fillerData: ScheduleItemT = {
      ...filteredSchedule[filteredSchedule.length],
      id: filteredSchedule.length + i + 1,
    };
    filteredSchedule.push(fillerData);
  }

  return filteredSchedule;
};
