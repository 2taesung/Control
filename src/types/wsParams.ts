import { Apps } from './app';
import { Sites } from './site';

export type WsParams = {
  app: Apps;
  site: Sites;
  sector: string;
};

export type WsParamsWithoutSector = Omit<WsParams, 'sector'>;
export type WsParamsWithoutApp = Omit<WsParams, 'app'>;
export type WsParamsWithSiteOnly = Pick<WsParams, 'site'>;
export type WsParamsWithAppOnly = Pick<WsParams, 'app'>;
