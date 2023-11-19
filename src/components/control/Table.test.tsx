import { screen, render } from '@testing-library/react';
import React from 'react';

import { testSchedules } from '@/fixtures';

import Table from './Table';

describe('Table component', () => {
  it('renders correctly with schedules and apply mode', () => {
    const schedules = [...testSchedules];
    const setNewSchedule = jest.fn();

    render(
      <Table
        app="uc"
        schedules={schedules}
        isApply={true}
        setNewSchedule={setNewSchedule}
      />,
    );

    // Check if the schedules are rendered
    //id
    schedules.forEach(schedule => {
      expect(screen.getByText(schedule.id)).toBeInTheDocument();
    });

    //startHour, startMin, temp, 17
    schedules.forEach(schedule => {
      const startHourElements = screen.queryAllByDisplayValue(
        schedule.startHour,
      );
      expect(startHourElements.length).toBeGreaterThan(0);
      const startMinElements = screen.queryAllByDisplayValue(schedule.startMin);
      expect(startMinElements.length).toBeGreaterThan(0);
    });
  });

  it('renders noting if schedules are empty', () => {
    const setNewSchedule = jest.fn();

    render(
      <Table
        app="uc"
        schedules={[]}
        isApply={false}
        setNewSchedule={setNewSchedule}
      />,
    );

    expect(screen.queryByText('classId')).not.toBeInTheDocument();
  });
});
