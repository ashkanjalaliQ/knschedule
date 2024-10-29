import React from 'react';
import { Day } from '@/lib/types';
import { getTimeBlockStyle, isCurrentClass, timeLabels } from '@/lib/utils';

interface TimelineProps {
  day: Day;
  isToday: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ day, isToday }) => {
  return (
    <div className="mb-6 relative">
      <div className="h-10 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden timeline-grid">
        <div className="absolute top-0 right-0 left-0 flex justify-between px-2 text-xs text-gray-400 py-1" dir="rtl">
          {timeLabels.map((label, idx) => (
            <span key={idx}>{label}</span>
          ))}
        </div>
        {day.classes.map((classItem, index) => (
          <div
            key={index}
            className={`absolute h-3 rounded-xl bottom-1 ${isCurrentClass(classItem) && isToday  ? 'ring-2 ring-yellow-400' : ''}`}
            style={getTimeBlockStyle(classItem, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
