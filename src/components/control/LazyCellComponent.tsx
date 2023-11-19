import { AppToValues, LazyCellComponentProps } from '@src/types';

import CellInput from './CellInput';
import Row from './Row';

const renderTempCell = (tempValue: number) => (
  <Row.Cell value={tempValue}>
    <CellInput type="temp" inputType="number" />
  </Row.Cell>
);

const renderHumCell = (humValue: number) => (
  <Row.Cell value={humValue}>
    <CellInput type="hum" inputType="number" />
  </Row.Cell>
);

const renderOnOffCell = (onOffValue: boolean) => (
  <Row.Cell value={onOffValue}>
    <CellInput type="onOff" inputType="checkbox" />
  </Row.Cell>
);

const LazyCellComponent = (props: LazyCellComponentProps) => {
  const { app, values } = props;

  switch (app) {
    case 'uc': {
      const ucValues = values as AppToValues['uc'];
      if (!ucValues.temp) return null;
      return renderTempCell(ucValues.temp);
    }
    case 'hum': {
      const humValues = values as AppToValues['hum'];
      if (!humValues.hum) return null;
      return renderHumCell(humValues.hum);
    }
    case 'ef': {
      const efValues = values as AppToValues['ef'];
      if (!efValues.onOff) return null;
      return renderOnOffCell(efValues.onOff);
    }
    default:
      return null;
  }
};

export default LazyCellComponent;
