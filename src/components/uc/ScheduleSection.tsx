import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getScheduleData } from '@src/api/schedules';
import { controlTargetMachineNumAtom } from '@src/atoms';
import { currentSectorAtom } from '@src/atoms/currentSectorAtom';
import { addSchedule } from '@src/functions/addSchedule';
import { DEFAULT_SCHEDULES_MAP } from '@src/functions/defaultSechedule';
import { useControlWebSocket } from '@src/hooks/useControlWebsocket';
import useRequiredQuery from '@src/hooks/useRequiredQuery';
import { Apps, ScheduleT, resScheduleT } from '@src/types';
import { ScheduleItemT } from '@src/types/schedule';
import { filteredDuplicateTime } from '@src/utils/filteredDuplicateTime';
import { layoredSort } from '@src/utils/layoredSort';
import { mappingIdFromIndex } from '@src/utils/mappingIdFromIndex';

import Table from '../control/Table';

export default function ScheduleSection({ currentApp }: { currentApp: Apps }) {
  const { site } = useRequiredQuery();
  const currentSector = useAtomValue(currentSectorAtom);
  const targetMachineNum = useAtomValue(controlTargetMachineNumAtom);

  const [scheduleData, setScheduleData] = useState<resScheduleT>(
    {} as resScheduleT,
  );

  const [schedule, setSchedule] = useState<ScheduleT>([]);
  const { webSocketScheduleData } = useControlWebSocket({
    app: currentApp,
    site,
    sector: currentSector,
  });

  const fetchScheduleData = useCallback(async () => {
    const fetchedData = await getScheduleData({
      app: currentApp,
      site,
      sector: currentSector,
    });
    return fetchedData;
  }, [site, currentApp, currentSector]);

  const updateSchedule = useCallback(
    (newScheduleData: resScheduleT) => {
      const updatedData = { ...newScheduleData };
      const schedulePath = updatedData.data[targetMachineNum]?.schedule;

      // 이 조건은 targetMachineNum의 schedule이 없을 때 함수를 종료합니다.
      if (!schedulePath) return;

      const targetSchedule =
        schedulePath.length === 0
          ? (DEFAULT_SCHEDULES_MAP.get(currentApp) as ScheduleT)
          : schedulePath;

      updatedData.data[targetMachineNum].schedule = targetSchedule;
      updatedData.data[targetMachineNum].scheduleLength = targetSchedule.length;

      setScheduleData(updatedData);
      const newSchedule = updatedData.data[targetMachineNum].schedule;
      const sortedSchedule = layoredSort({
        targetArr: filteredDuplicateTime(newSchedule),
        keyArr: ['startHour', 'startMin'],
      });
      const scheduleWithId = mappingIdFromIndex<ScheduleItemT>({
        arr: sortedSchedule,
      });

      setSchedule(scheduleWithId);
    },
    [setScheduleData, setSchedule, targetMachineNum, currentApp],
  );

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchScheduleData();
      updateSchedule(fetchedData);
    })();
  }, [fetchScheduleData, site, currentApp, currentSector, updateSchedule]);

  useEffect(() => {
    if (webSocketScheduleData) {
      updateSchedule(webSocketScheduleData);
    }
  }, [webSocketScheduleData, updateSchedule]);

  useEffect(() => {
    setScheduleData(prev => ({ ...prev, schedule: schedule }));
  }, [schedule]);

  return (
    <SectionDiv>
      <MainSectionTitle>스케줄제어</MainSectionTitle>
      <Table
        app={currentApp}
        schedules={schedule}
        isApply={true}
        setNewSchedule={setSchedule}
      />
      <MainSectionTitle>
        {scheduleData ? (
          <button
            onClick={() => {
              addSchedule({
                app: currentApp,
                targetMachineNum,
                scheduleData,
                schedule,
              });
            }}
          >
            OK
          </button>
        ) : null}
      </MainSectionTitle>
    </SectionDiv>
  );
}

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 30px;

  background-color: #fff;
`;

const MainSectionTitle = styled.p`
  padding: 30px;

  background-color: #fff;

  color: rgba(96, 96, 96, 1);
  font-size: 20px;
`;
