import React from 'react';
import { ClassItem } from '@/lib/types';
import {
  createGoogleCalendarLink,
  getClassColor,
  isCurrentClass
} from '@/lib/utils';

interface ClassCardProps {
  classItem: ClassItem;
  index: number;
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem, index }) => {
  const handleAddToGoogleCalendar = () => {
    const link = createGoogleCalendarLink(classItem);
    window.open(link, '_blank'); // Open in a new tab
  };
  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-300 ${isCurrentClass(classItem) ? 'ring-2 ring-indigo-500' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full ml-2"
            style={{ backgroundColor: getClassColor(index) }}
          ></div>
          <h4 className="font-semibold text-gray-800">{classItem.title}</h4>
        </div>
        <span className="text-sm text-gray-600">
          <i className="far fa-clock ml-1"></i>
          {classItem.startTime} - {classItem.endTime}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <i className="fas fa-map-marker-alt w-5 text-indigo-500"></i>
          <span>{classItem.location}</span>
        </div>
        <div className="flex items-center">
          <i className="fas fa-door-open w-5 text-indigo-500"></i>
          <span>{classItem.room}</span>
        </div>
        <button
          className="px-3 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full transition-colors duration-300 flex items-center group"
          onClick={handleAddToGoogleCalendar}
        >
          <i className="fas fa-calendar-plus ml-1 group-hover:scale-110 transition-transform duration-300"></i>
          افزودن به گوگل کلندر
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
