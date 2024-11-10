import React from 'react';
import DayCard from './day-card';
import scheduleData from '../lib/data';
import { getOrderedSchedule, isToday } from '@/lib/utils';
import { useGender } from '@/lib/gender';

type ScheduleProps = {
  scheduleData: typeof scheduleData;
};

export const getStaticProps = async () => {
  return {
    props: {
      scheduleData,
    },
  };
};

const Schedule: React.FC<ScheduleProps> = ({ scheduleData }) => {
  const { gender } = useGender();
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