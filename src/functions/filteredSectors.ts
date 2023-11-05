import { ALL_SECTORS } from '@src/constants/display/index';
import { WsParamsWithoutSector } from '@src/types';

import { filteredSectorsByAppNameOnlyTb } from './filteredSectorsByAppName';

export default function filteredSectors({ site, app }: WsParamsWithoutSector) {
  const filteredSectorsBySite = ALL_SECTORS[site];
  if (site !== 'md') {
    return filteredSectorsByAppNameOnlyTb({ filteredSectorsBySite, app });
  }

  return filteredSectorsBySite;
}
