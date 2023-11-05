import { ChangeEvent, useContext } from 'react';
import { styled } from 'styled-components';

import { ScheduleT, TableHeadsT } from '@src/types';
import {
  checkboxTransformer,
  noop,
  numberTransformer,
} from '@src/utils/common';

import { CellContext } from './Cell';
import { valueRange } from './inputConfig';
import { RowContext } from './Row';

const handleMin = (type: keyof typeof valueRange) => {
  return valueRange[type]?.min;
};

const handleMax = (type: keyof typeof valueRange) => {
  return valueRange[type]?.max;
};

const transformerMap = new Map([
  ['checkbox', checkboxTransformer],
  ['number', numberTransformer],
]);

type CellInputProps = {
  type: TableHeadsT;
  inputType: 'checkbox' | 'number';
  isHidden?: boolean;
};

export default function CellInput({
  type,
  inputType,
  isHidden,
}: CellInputProps) {
  const contextRow = useContext(RowContext);
  const contextCell = useContext(CellContext);

  if (!contextRow || !contextCell) {
    throw new Error('Cell must be used within a Row');
  }

  const { id, setNewSchedule } = contextRow;
  const { value } = contextCell;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setNewSchedule((prev: ScheduleT): ScheduleT => {
      const filterdPrev = prev.map(schedule => {
        if (schedule.id === id) {
          return {
            ...schedule,
            [type]: transformerMap.get(inputType)?.(target),
          };
        }
        return schedule;
      });
      return filterdPrev;
    });
  };

  if (type === 'apply' && !Boolean(value) && inputType === 'checkbox') {
    isHidden = true;
  }

  return (
    <StyledInputTd
      type={inputType}
      checked={inputType === 'checkbox' ? Boolean(value) : undefined}
      hidden={isHidden}
      value={Number(value)}
      onChange={type === 'apply' ? noop : handleInput}
      min={handleMin(type)}
      max={handleMax(type)}
    />
  );
}

const StyledInputTd = styled.input`
  width: 50px;
`;
