import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import Cell, { CellContext } from './Cell';

describe('Cell component', () => {
  it('provides correct value through context', () => {
    let contextValue;
    const TestComponent = () => {
      return (
        <CellContext.Consumer>
          {context => {
            contextValue = context;
            return null;
          }}
        </CellContext.Consumer>
      );
    };

    render(
      <table>
        <tbody>
          <tr>
            <Cell value={5}>
              <TestComponent />
            </Cell>
          </tr>
        </tbody>
      </table>,
    );

    expect(contextValue).toEqual({ value: 5 });
  });
});
