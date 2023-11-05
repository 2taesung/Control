import { ReactNode } from 'react';

import { HeadCell } from './HeadCell';

export default function HeadRow({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>;
}

HeadRow.HeadCell = HeadCell;
