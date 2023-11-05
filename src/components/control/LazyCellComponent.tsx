import { AppToValues, LazyCellComponentProps } from '@src/types';

import CellInput from './CellInput';
import Row from './Row';

const LazyCellComponent = (props: LazyCellComponentProps) => {
  const { app, values } = props;
  switch (app) {
    case 'uc': {
      const ucValues = values as AppToValues['uc'];
      return (
        <Row.Cell value={ucValues.temp}>
          <CellInput type="temp" inputType="number" />
        </Row.Cell>
      );
    }
    case 'hum': {
      const humValues = values as AppToValues['hum'];
      return (
        <Row.Cell value={humValues.hum}>
          <CellInput type="hum" inputType="number" />
        </Row.Cell>
      );
    }
    case 'hvac': {
      const hvacValues = values as AppToValues['hvac'];
      return (
        <>
          <Row.Cell value={hvacValues.temp}>
            <CellInput type="temp" inputType="number" />
          </Row.Cell>
          <Row.Cell value={hvacValues.hum}>
            <CellInput type="hum" inputType="number" />
          </Row.Cell>
        </>
      );
    }
    case 'ef': {
      const efValues = values as AppToValues['ef'];
      return (
        <Row.Cell value={efValues.onOff}>
          <CellInput type="onOff" inputType="checkbox" />
        </Row.Cell>
      );
    }
    default:
      return null;
  }
};

export default LazyCellComponent;
