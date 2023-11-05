import { WsParamsWithAppOnly } from '@src/types';

export const SECTORS_FILTER_APPNAME_DATA: { [key: string]: string[] } = {
  uc: ['r', 'path', 'packing'],
};

type Params = WsParamsWithAppOnly & {
  filteredSectorsBySite: string[];
};

export const filteredSectorsByAppNameOnlyTb = ({
  filteredSectorsBySite,
  app,
}: Params) => {
  const filterData = SECTORS_FILTER_APPNAME_DATA[app];
  if (!filterData) {
    return [];
  }

  return filteredSectorsBySite.filter(sectorName =>
    filterData.includes(sectorName),
  );
};
