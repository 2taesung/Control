import { Apps } from './app';
import { Sites } from './site';

export type WsParams = {
  app: Apps;
  site: Sites;
  sector: string;
};

export type WsParamsWithSiteOnly = Pick<WsParams, 'site'>;

export type WsParamsWithoutApp = Omit<WsParams, 'app'>;

export type WsParamsWithAppOnly = Pick<WsParams, 'app'>;
