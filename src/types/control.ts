import { Apps } from './app';
import { Sites } from './site';

export type ControlType = 'valueData';

export type TargetControl =
  | 'setTemp'
  | 'setVentilateCtrlDefro'
  | 'setHum'
  | 'status';

export type PostControlValueParams = {
  app: Apps;
  data: {
    type: ControlType;
    target: TargetControl;
    value: number | boolean;
    targetMachine: string;
    site: Sites;
    sector: string;
  };
};

export type TabKey = 'control' | 'monitor';
