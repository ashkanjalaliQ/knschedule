import React from 'react';
import { ClassItem, Day } from '@/lib/types';
import {
  createGoogleCalendarLink,
  getClassColor,
  isCurrentClass,
} from '@/lib/utils';
import {
  FaCalendarPlus,
  FaDoorOpen,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { Clock } from 'lucide-react';

interface ClassCardProps {
  classItem: ClassItem;
  index: number;
  isToday: boolean;
  day: Day;
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem, index, isToday, day }) => {
  const handleAddToGoogleCalendar = (day: Day) => {
    const link = createGoogleCalendarLink(classItem, day.name);
    window.open(link, '_blank');
  };
  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 dark:bg-gray-800 hover:bg-gray-100 transition-colors duration-300 ${isCurrentClass(classItem) && isToday ? 'ring-2 ring-indigo-500' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full ml-2"
            style={{ backgroundColor: getClassColor(index) }}
          ></div>
          <p className="font-semibold text-gray-800 dark:text-white">{classItem.title}</p>
        </div>
        <span className="text-sm text-gray-600 flex flex-row dark:text-gray-400">
          <Clock className="text-xs w-4 h-4 ml-1" />
          {classItem.startTime} - {classItem.endTime}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600 dark:text-white">
        <div className="flex items-center">
          <FaMapMarkerAlt className="w-5 ml-1 text-indigo-500" />
          <span>{classItem.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className='flex flex-row'>
            <FaDoorOpen className="w-5 ml-1 text-indigo-500" />
            <span>{classItem.room}</span>
          </div>

          <button
            className="px-3 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-200 hover:shadow-md text-indigo-600 rounded-full transition-all duration-200 focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500 flex items-center group"
            onClick={() => handleAddToGoogleCalendar(day)}
          >
            <FaCalendarPlus className="ml-1 group-hover:scale-110 transition-transform duration-300" />
            افزودن به گوگل کلندر
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
