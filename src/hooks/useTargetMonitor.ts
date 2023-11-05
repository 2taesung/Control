import { makeTargetMap } from '@src/functions/makeTargetMap';
import { TargetControl, WsParams } from '@src/types';

import { useMonitorWebsocket } from './useMonitorWebsocket';

export default function useTargetMonitor({
  site,
  app,
  sector,
  targetMachineNum,
  targets,
}: WsParams & { targetMachineNum: string; targets: TargetControl[] }) {
  const { machineData } = useMonitorWebsocket({
    app,
    site,
    sector,
  });

  const targetMachine = machineData?.[targetMachineNum];

  const { targetMap, trigger } = targetMachine
    ? makeTargetMap({ targetMachine, targets })
    : { targetMap: new Map(), trigger: '' };

  return { targetMap, trigger };
}
