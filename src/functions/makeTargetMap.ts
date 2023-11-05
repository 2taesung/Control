import { TargetControl } from '@src/types';

interface TargetMachine {
  [key: string]: string | number | boolean | null;
}

// Define the params type for makeTargetMap function
interface MakeTargetMapParams {
  targetMachine: TargetMachine;
  targets: TargetControl[];
}

export const makeTargetMap = ({
  targetMachine,
  targets,
}: MakeTargetMapParams) => {
  const targetMap = new Map<TargetControl, string | number | boolean | null>();
  for (const target of targets) {
    targetMap.set(target, targetMachine?.[target]);
  }

  const trigger = JSON.stringify(Array.from(targetMap.entries()));

  return { targetMap, trigger };
};
