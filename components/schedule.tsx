import React from 'react';
import DayCard from './day-card';
import scheduleData from '../lib/data';
import { getOrderedSchedule, isToday } from '@/lib/utils';

type ScheduleProps = {
  gender: 'boys' | 'girls'; 
  scheduleData: typeof scheduleData;
};

export const getStaticProps = async () => {
  return {
    props: {
      scheduleData,
    },
  };
};

const Schedule: React.FC<ScheduleProps> = ({ gender, scheduleData }) => {
  const schedule = getOrderedSchedule(scheduleData.schedule[gender]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {schedule.map((day, index) => (
        <DayCard key={day.name} day={day} isToday={isToday(index)} />
      ))}
    </div>
  );
};

export default Schedule;