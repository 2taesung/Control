import { ScheduleItemT } from './schedule';
import { SiteAuthorityT } from './site';

export type User = {
  username: string;
  password: string;
};

export type UserResponse = {
  userName: string;
  siteAuthority: SiteAuthorityT;
  controlAuthority: {
    [key: string]: boolean;
  };
};

export type reqStateT = {
  currentSite: string;
  currentSector: string;
};

export type TableHeadsT = Exclude<keyof ScheduleItemT, 'classId'>;

export type OnChangeTargetTransformer = (
  value: HTMLInputElement,
) => number | boolean;

export type sectorsT = string[];

export type { Apps, AppToValues, LazyCellComponentProps } from './app';

export type {
  ControlType,
  TargetControl,
  PostControlValueParams,
  TabKey,
} from './control';

export type {
  WsParams,
  WsParamsWithoutSector,
  WsParamsWithAppOnly,
} from './wsParams';

export type {
  resScheduleT,
  ScheduleDataT,
  ScheduleT,
  ScheduleItemT,
} from './schedule';

export type { Sites, SiteAuthorityT, SiteData } from './site';
