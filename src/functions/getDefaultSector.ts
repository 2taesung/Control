import { WsParamsWithSiteOnly } from '@src/types';

import filteredSectors from './filteredSectors';

export const getDefaultSector = ({ site }: WsParamsWithSiteOnly) => {
  const sector = filteredSectors({ site })[0];
  return sector;
};
