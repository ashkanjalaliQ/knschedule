import React from 'react';
import { Day } from '@/lib/types';
import Timeline from '@/components/timeline';
import ClassCard from '@/components/class-card';
import { BiCalendarX } from 'react-icons/bi';

interface DayCardProps {
  day: Day;
  isToday: boolean;
}

const DayCard: React.FC<DayCardProps> = ({ day, isToday }) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden slide-in bg-white dark:bg-gray-900 ${isToday ? 'ring-2 ring-yellow-300' : ''}`}
    >
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">{day.name}</p>
          {isToday && (
            <span className="bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-sm font-medium">
              امروز
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <Timeline day={day} isToday={isToday}/>
        <div className="space-y-4">
          {day.classes.length === 0 ? (
            <div className="text-center flex flex-col items-center py-8 text-gray-500">
              <BiCalendarX className="text-center fa-calendar-xmark text-4xl mb-2" />
              <p>کلاسی برای این روز وجود ندارد</p>
            </div>
          ) : (
            day.classes.map((classItem, index) => (
              <ClassCard key={index} classItem={classItem} index={index} isToday={isToday} day={day}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DayCard;
