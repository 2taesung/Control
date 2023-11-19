import { ALL_SECTORS } from '@src/constants/display/index';
import { WsParamsWithSiteOnly } from '@src/types';

export default function filteredSectors({ site }: WsParamsWithSiteOnly) {
  const filteredSectorsBySite = ALL_SECTORS[site];

  return filteredSectorsBySite;
}
