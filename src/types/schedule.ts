import { WsParamsWithoutApp } from './wsParams';

export type ScheduleItemT = {
  classId?: string;
  id: number;
  enable: boolean;
  startHour: number;
  startMin: number;
  temp?: number;
  hum?: number;
  apply?: boolean;
  status?: boolean;
  onOff?: boolean;
};

export type ScheduleT = ScheduleItemT[];

export type ScheduleDataT = {
  target: string[];
  topic: string;
  ts: number;
  type: string;
  userId: string;
  userSettingDate: number;
  uuid: string;
  site: string;
  sector: string;
  scheduleLength: number;
  schedule: ScheduleT;
};

export type resScheduleT = WsParamsWithoutApp & {
  type: string;
  data: { [key: string]: ScheduleDataT };
};
