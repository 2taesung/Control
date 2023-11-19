import { ReactNode, createContext } from 'react';

type CellProps = {
  value: number | boolean | undefined | null;
  children: ReactNode;
};

export const CellContext = createContext<Pick<CellProps, 'value'> | undefined>(
  undefined,
);

export default function Cell({ value, children }: CellProps) {
  return (
    <CellContext.Provider value={{ value }}>
      <td>{children}</td>
    </CellContext.Provider>
  );
}
