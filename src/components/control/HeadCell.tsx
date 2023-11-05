import { ReactNode } from 'react';

import { TableHeadsT } from '@src/types';

const headerMapping: { [key in TableHeadsT]: string } = {
  id: 'ID',
  enable: 'Enabled',
  startHour: 'Start Hour',
  startMin: 'Start Min',
  temp: 'Temp',
  hum: 'Hum',
  apply: 'Apply',
  status: 'Status',
  onOff: 'On/Off',
};

export function HeadCell({ tableHead }: { tableHead: TableHeadsT }): ReactNode {
  return <th>{headerMapping[tableHead] || tableHead}</th>;
}
