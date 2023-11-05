import React, { createContext, ReactNode } from 'react';

import { ScheduleT } from '@src/types';

import Cell from './Cell';

type RowContextType = {
  id: number;
  setNewSchedule: (callback: (prev: ScheduleT) => ScheduleT) => void;
};

type RowProps = RowContextType & {
  children: ReactNode;
};

export const RowContext = createContext<RowContextType | undefined>(undefined);

export default function Row({ children, id, setNewSchedule }: RowProps) {
  return (
    <RowContext.Provider value={{ id, setNewSchedule }}>
      <tr>{children}</tr>
    </RowContext.Provider>
  );
}

Row.Cell = Cell;
