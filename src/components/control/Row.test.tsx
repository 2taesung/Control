import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';

import Row, { RowContext } from './Row';

// TableContext를 사용하는 가짜 자식 컴포넌트
const FakeChild = () => {
  const context = useContext(RowContext);
  return <td>{context?.id}</td>;
};

describe('Row component', () => {
  it('provides the correct context values', () => {
    const id = 42;
    const setNewSchedule = jest.fn();

    render(
      <table>
        <tbody>
          <Row id={id} setNewSchedule={setNewSchedule}>
            <FakeChild />
          </Row>
        </tbody>
      </table>,
    );

    expect(screen.getByText(id.toString())).toBeInTheDocument();
  });
});
