import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getScheduleData } from '@src/api/schedules';
import { controlTargetMachineNumAtom } from '@src/atoms';
import { currentSectorAtom } from '@src/atoms/currentSectorAtom';
import useRequiredQuery from '@src/hooks/useRequiredQuery';
import { Apps } from '@src/types';

import InstantSection from './InstantSection';
import ScheduleSection from './ScheduleSection';

const APP_RADIO_OPTION = [
  { id: 'uc', value: 'uc', label: '유니트쿨러' },
  { id: 'hum', value: 'hum', label: '가습기' },
  { id: 'ef', value: 'ef', label: '팬' },
];

export default function MainSection() {
  const { site, app } = useRequiredQuery();

  /**
   * UC의 경우 app에 대한 추가 계층이 존재
   * 그래서 app 대신 currentApp 변수명으로 층을 추가해 사용
   */
  const [currentApp, setCurrentApp] = useState(app);
  const [targetMachineNum, setTargetMachineNum] = useAtom(
    controlTargetMachineNumAtom,
  );
  const currentSector = useAtomValue(currentSectorAtom);
  const [targetMachineNums, setTargetMachineNums] = useState(['1']);
  const fetchScheduleData = useCallback(async () => {
    const fetchedData = await getScheduleData({
      app: currentApp,
      site,
      sector: currentSector,
    });
    return fetchedData;
  }, [site, currentApp, currentSector]);

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchScheduleData();
      const targetMachineNums = Object.keys(fetchedData.data);
      // fetchedData.data에 targetMachineNum이 포함되어 있는지 확인
      if (!targetMachineNums.includes(targetMachineNum)) {
        // targetMachineNum이 없으면 '1'로 설정
        setTargetMachineNum('1');
      }

      // targetMachineNums 상태 업데이트
      setTargetMachineNums(targetMachineNums);
    })();
  }, [fetchScheduleData, site, currentApp, currentSector]);

  const handleCurrentAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentApp(value as Apps);
  };

  const handleTargetMachineNumChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setTargetMachineNum(value);
  };

  return (
    <MainSectionLayout>
      <CardLayout>
        <TopContainer>
          {APP_RADIO_OPTION.map(option => (
            <div key={option.id}>
              <input
                type="radio"
                id={option.id}
                name="drone"
                value={option.value}
                checked={currentApp === option.value}
                onChange={handleCurrentAppChange}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </TopContainer>
      </CardLayout>
      <CardLayout>
        <TopContainer>
          {targetMachineNums.map(num => (
            <div key={num}>
              <input
                type="radio"
                id={num}
                name={`machineNum_${num}`}
                value={num}
                checked={targetMachineNum === num}
                onChange={handleTargetMachineNumChange}
              />
              <label htmlFor={num}>{`machineNum_${num}`}</label>
            </div>
          ))}
        </TopContainer>
      </CardLayout>
      <InstantSection currentApp={currentApp} />
      <ScheduleSection currentApp={currentApp} />
    </MainSectionLayout>
  );
}

const MainSectionLayout = styled.div`
  display: flex;
  flex-direction: column;

  width: 586px;
  border-radius: 4px;
`;

const CardLayout = styled.div`
  width: 378px;
  margin-bottom: 20px;
  padding-bottom: 18px;
  border-radius: 4px;

  background-color: #fff;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-around;

  padding-top: 30px;
`;
