import { sectorsT } from '@src/types';

import { mdSectorData } from './SECTOR_DISPLAY';

type allSectorsT = { [key: string]: sectorsT };

const ALL_SECTORS: allSectorsT = {
  md: Object.keys(mdSectorData),
};

export { ALL_SECTORS };
