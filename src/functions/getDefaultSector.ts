import { WsParamsWithoutSector } from '@src/types';

import filteredSectors from './filteredSectors';

export const getDefaultSector = ({ app, site }: WsParamsWithoutSector) => {
  const sector = filteredSectors({ site, app })[0];
  return sector;
};
