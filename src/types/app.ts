export type Apps = 'uc' | 'hum' | 'ef';

export type AppToValues = {
  uc: { temp: number | undefined };
  hum: { hum: number | undefined };
  ef: { onOff: boolean | undefined };
};

export type LazyCellComponentProps = {
  app: Apps;
  values: AppToValues[Apps];
};
