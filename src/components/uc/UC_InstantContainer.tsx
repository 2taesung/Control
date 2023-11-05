import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getInstantValueData, postInstantValue } from '@src/api/Instantces';
import { controlTargetMachineNumAtom } from '@src/atoms';
import { currentSectorAtom } from '@src/atoms/currentSectorAtom';
import { TARGETS_MAP, TYPE } from '@src/constants/UC';
import { makeTargetMap } from '@src/functions/makeTargetMap';
import useRequiredQuery from '@src/hooks/useRequiredQuery';
import useTargetMonitor from '@src/hooks/useTargetMonitor';
import { baseFlex } from '@src/styles/mixins';
import { Apps, ControlType, TargetControl } from '@src/types';

import InputField from './InputField';

type ValueGetter = (target: HTMLInputElement) => boolean | number;
type SettingValueParams = {
  type: ControlType;
  target: TargetControl;
  targetMachineNum: string;
  value: boolean | number;
};

const typeToValueMap = new Map<string, ValueGetter>([
  ['checkbox', (target: HTMLInputElement) => target.checked],
  ['number', (target: HTMLInputElement) => Number(target.value)],
]);

export default function UC_ImmediateContainer({
  currentApp,
}: {
  currentApp: Apps;
}) {
  const { site } = useRequiredQuery();
  const currentSector = useAtomValue(currentSectorAtom);
  const targetMachineNum = useAtomValue(controlTargetMachineNumAtom);
  const [dynamicTargets, setDynamicTargets] = useState<TargetControl[]>([]);

  useEffect(() => {
    // currentApp 값에 따라 dynamicTargets를 업데이트합니다.
    const newTargets = TARGETS_MAP[currentApp];
    setDynamicTargets(newTargets);
  }, [currentApp]);

  const [machineData, setMachineData] = useState(new Map());
  const { targetMap, trigger } = useTargetMonitor({
    site,
    app: currentApp,
    sector: currentSector,
    targetMachineNum,
    targets: dynamicTargets,
  });

  useEffect(() => {
    if (!!targetMap.size) {
      setMachineData(targetMap);
    }
  }, [targetMap.size, trigger]);

  const fetchInstantValueData = useCallback(async () => {
    const fetchedData = await getInstantValueData({
      app: currentApp,
      site,
      sector: currentSector,
    });
    const { data } = fetchedData;
    return data;
  }, [currentApp]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedData = await fetchInstantValueData();
        if (fetchedData && fetchedData[targetMachineNum]) {
          const { targetMap } = makeTargetMap({
            targetMachine: fetchedData[targetMachineNum],
            targets: dynamicTargets,
          });
          setMachineData(targetMap);
        } else {
          console.error(
            `No data found for targetMachineNum: ${targetMachineNum}`,
          );
        }
      } catch (error) {
        // 오류 로깅
        console.error('Error fetching data:', error);
      }
    })();
  }, [fetchInstantValueData, targetMachineNum, dynamicTargets]);

  const settingValue = async ({
    type,
    target,
    targetMachineNum,
    value,
  }: SettingValueParams) => {
    await postInstantValue({
      app: currentApp,
      data: {
        type,
        target,
        value,
        targetMachine: `${currentApp}_${targetMachineNum}`,
        site: site,
        sector: currentSector,
      },
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const targetKey = target.name; // HTML 요소의 name 속성 값을 가져옴
    const type = target.type;

    // Map에서 적절한 함수를 찾아서 새로운 값을 설정
    const getValue = typeToValueMap.get(type);
    if (getValue) {
      const newValue = getValue(target);

      // 유효성 검사나 다른 로직을 추가할 수 있습니다.
      setMachineData(prevMachineData => {
        // 기존 Map을 복사합니다.
        const newMachineData = new Map(prevMachineData);
        // targetKey에 해당하는 값을 업데이트합니다.
        newMachineData.set(targetKey, newValue);
        return newMachineData;
      });
    }
  };

  return (
    <ImmediateContainerLayout>
      <div>
        {dynamicTargets.map(target => (
          <div key={target}>
            <InputField
              target={target}
              machineData={machineData}
              handleInput={handleInput}
            />

            <button
              onClick={() => {
                settingValue({
                  type: TYPE,
                  target,
                  targetMachineNum,
                  value: machineData.get(target),
                });
              }}
            >
              확인
            </button>
          </div>
        ))}
      </div>
    </ImmediateContainerLayout>
  );
}

const ImmediateContainerLayout = styled.div`
  ${baseFlex}
`;
