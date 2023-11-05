import React, { useMemo } from 'react';
import { lazy, Suspense } from 'react';

import useApplyIndex from '@src/hooks/useApplyIndex';
import {
  Apps,
  LazyCellComponentProps,
  ScheduleItemT,
  ScheduleT,
  TableHeadsT,
} from '@src/types';

import CellInput from './CellInput';
import HeadRow from './HeadRow';
import Row from './Row';

type TableProps = {
  app: Apps;
  schedules: ScheduleT;
  isApply: boolean;
  setNewSchedule: (callback: (prev: ScheduleT) => ScheduleT) => void;
};

type TableHeadParams = Pick<TableProps, 'schedules' | 'isApply'>;

type ImportFunctionType = () => Promise<{
  default: React.ComponentType<LazyCellComponentProps>;
}>;

const withLazyLoading = (importFunction: ImportFunctionType) => {
  const LazyComponent = lazy(importFunction);

  return function LazyComponentWrapper(props: LazyCellComponentProps) {
    return (
      <Suspense fallback={<td>Loading...</td>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

const LazyLoadedCellComponent = withLazyLoading(
  () => import('./LazyCellComponent'),
);

export default function Table({
  app,
  schedules,
  isApply,
  setNewSchedule,
}: TableProps) {
  const getTableHeads = ({ schedules, isApply }: TableHeadParams) => {
    if (!schedules?.length) return [];

    //Object.keys타입 단언
    const keys = Object.keys(schedules[0]) as (keyof ScheduleItemT)[];
    return keys
      .filter(key => key !== 'classId')
      .concat(isApply ? ['apply'] : []) as TableHeadsT[];
  };

  const tableHeads = useMemo(
    () => getTableHeads({ schedules, isApply }),
    [schedules, isApply],
  );

  const applyId = useApplyIndex({ schedules, isApply }) + 1;
  if (!schedules) return <div>스케줄 없음</div>;

  return (
    <div className="div-flex-column">
      <table>
        <thead>
          <HeadRow>
            {tableHeads.map(tableHead => {
              return <HeadRow.HeadCell key={tableHead} tableHead={tableHead} />;
            })}
          </HeadRow>
        </thead>
        <tbody>
          {schedules.map(
            ({ id, enable, startHour, startMin, temp, hum, onOff }) => {
              return (
                <Row key={id} id={id} setNewSchedule={setNewSchedule}>
                  <Row.Cell value={id}>
                    <span>{!id ? 'default' : id}</span>
                  </Row.Cell>
                  <Row.Cell value={enable}>
                    <CellInput
                      type="enable"
                      inputType="checkbox"
                      isHidden={!id}
                    />
                  </Row.Cell>
                  <Row.Cell value={startHour}>
                    <CellInput
                      type="startHour"
                      inputType="number"
                      isHidden={!id}
                    />
                  </Row.Cell>
                  <Row.Cell value={startMin}>
                    <CellInput
                      type="startMin"
                      inputType="number"
                      isHidden={!id}
                    />
                  </Row.Cell>
                  <LazyLoadedCellComponent
                    app={app}
                    values={{ temp, hum, onOff }}
                  />
                  <Row.Cell value={id === applyId}>
                    <CellInput
                      type="apply"
                      inputType="checkbox"
                      isHidden={!id}
                    />
                  </Row.Cell>
                </Row>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}
